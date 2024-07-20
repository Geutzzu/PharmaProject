import express from 'express';
import { check, validationResult } from 'express-validator';
import Prescription from '../db/models/prescription.js';
import Doctor from '../db/models/doctor.js';
import Patient from '../db/models/patient.js';
import { protectDoctor, checkAuthDoctor } from "../middleware/auth.js";

const router = express.Router();

// Create Patient
router.post(
  '/patients',
  protectDoctor,
  [
    check('firstName', 'First name is required').not().isEmpty().isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    check('lastName', 'Last name is required').not().isEmpty().isLength({ min: 3 }).withMessage('Last name must be at least 3 characters long'),
    check('CNP', 'CNP is required').not().isEmpty().isLength({ min: 13 }).withMessage('CNP must be at least 13 characters long'),
    check('phone', 'Phone number is required').not().isEmpty().isMobilePhone().withMessage('Invalid phone number'),
    check('email', 'Email is required').not().isEmpty().isEmail().withMessage('Invalid email address')
  ],
  async (req, res) => {
    console.log('Request Body:', req.body); // Log request body

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error('Validation Errors:', errors.array()); // Log validation errors
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, CNP, phone, email } = req.body;
    const doctorId = req.user.id;

    try {
      // Check if patient already exists
      let patient = await Patient.findOne({ CNP });

      if (!patient) {
        // Create a new patient
        patient = new Patient({
          firstName,
          lastName,
          CNP,
          phone,
          email
        });
        await patient.save();
        console.log('Patient Saved:', patient); // Log saved patient
      }

      // Add patient to doctor's patient list if not already added
      const doctor = await Doctor.findById(doctorId);
      if (!doctor.patients.includes(patient._id)) {
        doctor.patients.push(patient._id);
        await doctor.save();
      }

      res.status(201).json({ success: true, data: patient });
    } catch (err) {
      console.error('Error Saving Patient:', err.message); // Log errors
      res.status(500).send('Server error');
    }
  }
);


/*
// Create Prescription
router.post(
  '/prescriptions',
  protectDoctor,
  checkAuthDoctor,
  [
    check('medications', 'Medications are required').isArray({ min: 1 }),
    check('medications.*.name', 'Medication name is required').not().isEmpty(),
    check('medications.*.dosage', 'Dosage is required').not().isEmpty(),
    check('medications.*.quantity', 'Quantity must be at least 1').isInt({ min: 1 }),
    check('patientId', 'Patient ID is required').not().isEmpty(),
    check('notes', 'Notes are required').optional().isString(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { medications, patientId, notes } = req.body;

    try {
      // Verify patient exists
      const patient = await Patient.findById(patientId);
      if (!patient) {
        return res.status(404).json({ message: 'Patient not found' });
      }

      // Create the prescription
      const prescription = new Prescription({
        medications,
        patientId,
        doctorId: req.user.id,
        notes,
      });

      await prescription.save();
      res.status(201).json({ success: true, data: prescription });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);*/


// Create Prescription
// Create Prescription with patientId from URL
router.post(
  '/prescriptions/:patientId',
  protectDoctor,
  [
    check('medications', 'Medications are required').isArray({ min: 1 }),
    check('medications.*.name', 'Medication name is required').not().isEmpty(),
    check('medications.*.dosage', 'Dosage is required').not().isEmpty(),
    check('medications.*.quantity', 'Quantity must be at least 1').isInt({ min: 1 }),
    /// check('patientId', 'Patient ID is required').not().isEmpty(), we do not check this anymore
    check('notes', 'Notes are required').optional().isString(),
  ],
  async (req, res) => {
    const errors = validationResult(req); 
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { medications, notes } = req.body;
    const { patientId } = req.params; 

    try {
      // Verify patient exists
      const patient = await Patient.findById(patientId);
      if (!patient) {
        return res.status(404).json({ message: 'Patient not found' });
      }

      // Create the prescription
      const prescription = new Prescription({
        medications,
        patientId,
        doctorId: req.user.id,
        notes,
      });

      await prescription.save();
      res.status(201).json({ success: true, data: prescription });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// Get all prescriptions for a doctor
router.get('/doctor/:doctorId/prescriptions', protectDoctor, async (req, res) => {
  try {
    const prescriptions = await Prescription.find({ doctorId: req.params.doctorId }).populate('patientId').populate('doctorId');
    if (!prescriptions.length) {
      return res.status(404).json({ message: 'No prescriptions found for this doctor' });
    }
    res.json(prescriptions);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Get all prescriptions for a patient (by patient ID)
router.get('/patients/:patientId/prescriptions', protectDoctor, async (req, res) => {
  try {
    const prescriptions = await Prescription.find({ patientId: req.params.patientId }).populate('doctorId').populate('patientId');
    if (!prescriptions.length) {
      return res.status(404).json({ message: 'No prescriptions found for this patient' });
    }
    res.json(prescriptions);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});


// Gel all the information about a patient (aside from prescriptions)
router.get('/patients/:patientId', protectDoctor, async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.patientId);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json(patient);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  } 
});


// Get all patients for a doctor - we will use the id in the token to get the doctor id - doctor will be the placeholder in the path
router.get('/doctor/patients', protectDoctor, async (req, res) => {
  try {
    console.log('Doctor ID:', req.user.id); 

    const doctor = await Doctor.findById(req.user.id).populate('patients');
    if (!doctor || !doctor.patients.length) {
      return res.status(404).json({ message: 'No patients found for this doctor' });
    }

    res.json(doctor.patients);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

export default router;
