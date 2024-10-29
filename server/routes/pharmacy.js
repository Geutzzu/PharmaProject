
import express from 'express';
import { check, validationResult } from 'express-validator';
import Prescription from '../db/models/prescription.js';
import Doctor from '../db/models/doctor.js';
import Patient from '../db/models/patient.js';
import { protectDoctor, checkAuthDoctor, protectPharmacy } from "../middleware/auth.js";
import { Console } from 'console';

const router = express.Router();

router.get('/pharmacy/prescription/:prescriptionID', protectPharmacy, async (req, res) => {
  try {
    const prescription = await Prescription.find({ prescriptionID: req.params.prescriptionID }).populate('patientId').populate('doctorId');
    console.log(prescription);
    if (!prescription) {
      return res.status(404).json({ message: 'Prescription not found' });
    }
    res.json(prescription);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

router.patch('/pharmacy/prescription/:prescriptionId', protectPharmacy, async (req, res) => {
    try {// We update the id of the pharmacy inside the prescprition
        console.log('ObjectID: ', req.params.prescriptionId);
        console.log('PharmacyID: ', req.user.id);
        console.log('Cookie: ', req.cookies);

        const prescription = await Prescription.findByIdAndUpdate(req.params.prescriptionId, { pharmacyId: req.user.id }, { new: true });
        if (!prescription) {
        return res.status(404).json({ message: 'Prescription not found' });
        }
        res.json(prescription);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
    });

export default router;