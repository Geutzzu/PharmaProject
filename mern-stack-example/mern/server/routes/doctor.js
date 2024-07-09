import express from 'express';
import { check, validationResult } from 'express-validator';
import Prescription from '../db/models/prescription.js';
import Doctor from '../db/models/doctor.js';
import Patient from '../db/models/patient.js';
import Pharmacy from '../db/models/pharmacy.js';
import { protectPharmacy, protectDoctor, checkAuthDoctor } from "../middleware/auth.js";

const router = express.Router();


/// Create Patient - TBD



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
);


// Get all prescriptions for a doctor
router.get('/doctor/:doctorId/prescriptions', protectDoctor, checkAuthDoctor, async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.doctorId).populate('prescriptions');
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.json(doctor.prescriptions);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Get all prescriptions for a patient (by patient ID)
router.get('/patient/:patientId/prescriptions', protectDoctor, checkAuthDoctor, async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.patientId).populate('prescriptions');
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json(patient.prescriptions);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Get all patients for a doctor
router.get('/doctor/:doctorId/patients', protectDoctor, checkAuthDoctor, async (req, res) => {
  try {
    const doctorId = req.params.doctorId;

    // Find all prescriptions issued by the doctor
    const prescriptions = await Prescription.find({ doctorId }).select('patientId').populate('patientId');

    if (!prescriptions.length) {
      return res.status(404).json({ message: 'No patients found for this doctor' });
    }

    // Extract unique patient IDs
    const patientIds = [...new Set(prescriptions.map(prescription => prescription.patientId._id))];

    // Populate patient details using the extracted IDs
    const patients = await Patient.find({ _id: { $in: patientIds } });

    res.json(patients);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});



export default router;
