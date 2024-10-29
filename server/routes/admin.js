import express from 'express';
import multer from 'multer';
import UnclaimedDoctor from '../db/models/admin/unclaimedDoctor.js';
import mongoose from 'mongoose';
import path from 'path';
import crypto from 'crypto';
import fs from 'fs';
import { promisify } from 'util';
import { fileURLToPath } from 'url';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();
const unlinkAsync = promisify(fs.unlink);

// Define __dirname using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${crypto.randomBytes(6).toString('hex')}`;
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error('Invalid file type'), false);
  }
  cb(null, true);
};

const upload = multer({ 
  storage, 
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});


router.post('/unclaimed-doctors', upload.single('identityProof'), async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { body } = req;
    const identityProofPath = req.file.path;

    const newUnclaimedDoctor = new UnclaimedDoctor({ ...body, identityProof: identityProofPath });

    await newUnclaimedDoctor.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json(newUnclaimedDoctor);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    // Delete the uploaded file in case of an error
    const identityProofPath = req.file.path;
    console.error(`Error occurred, attempting to delete file: ${identityProofPath}`);
    
    try {
      await unlinkAsync(identityProofPath);
      console.log(`Successfully deleted file: ${identityProofPath}`);
    } catch (err) {
      console.error(`Failed to delete file: ${identityProofPath}`, err);
    }

    res.status(400).json({ error: error.message });
  }
});

// GET method to retrieve all unclaimed doctors
router.get('/unclaimed-doctors', protectAdmin, async (req, res) => {
  try {
    const unclaimedDoctors = await UnclaimedDoctor.find();
    res.status(200).json(unclaimedDoctors);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/claim-doctor/:id', protectAdmin, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const unclaimedDoctor = await UnclaimedDoctor.findById(req.params.id).session(session);
    if (!unclaimedDoctor) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: 'Unclaimed doctor not found' });
    }

    // Create a new doctor using the unclaimed doctor's information
    const newDoctor = new Doctor({
      username: unclaimedDoctor.username,
      role: 'doctor',
      email: unclaimedDoctor.email,
      phone: unclaimedDoctor.phone,
      password: unclaimedDoctor.password,
      firstname: unclaimedDoctor.firstname,
      lastname: unclaimedDoctor.lastname,
      codparafa: unclaimedDoctor.codparafa,
      clinicName: unclaimedDoctor.clinicName,
      clinicAddress: unclaimedDoctor.clinicAddress,
      clinicPhone: unclaimedDoctor.clinicPhone,
    });

    const savedDoctor = await newDoctor.save({ session });
    if (!savedDoctor) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: 'Failed to claim doctor' });
    }

    // Delete the unclaimed doctor from the database
    await UnclaimedDoctor.findByIdAndDelete(req.params.id).session(session);

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    // Delete the identity proof image after successful transaction
    const identityProofPath = path.join(__dirname, '..', unclaimedDoctor.identityProof);
    console.log(`Attempting to delete file: ${identityProofPath}`);

    try {
      await unlinkAsync(identityProofPath);
      console.log(`Successfully deleted file: ${identityProofPath}`);
    } catch (err) {
      console.error(`Failed to delete file: ${identityProofPath}`, err);
      // Optionally handle the file deletion failure, e.g., log the error for manual cleanup
    }

    res.status(201).json({ message: 'Doctor claimed successfully', doctor: newDoctor });

  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error('Error claiming doctor:', error);
    res.status(500).json({ error: error.message });
  }
});

router.delete('/reject-doctor/:id', protectAdmin, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const unclaimedDoctor = await UnclaimedDoctor.findById(req.params.id).session(session);
    if (!unclaimedDoctor) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: 'Unclaimed doctor not found' });
    }

    // Delete the unclaimed doctor from the database
    await UnclaimedDoctor.findByIdAndDelete(req.params.id).session(session);

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    // Delete the identity proof image after successful transaction
    const identityProofPath = path.join(__dirname, '..', unclaimedDoctor.identityProof);
    console.log(`Attempting to delete file: ${identityProofPath}`);

    try {
      await unlinkAsync(identityProofPath);
      console.log(`Successfully deleted file: ${identityProofPath}`);
    } catch (err) {
      console.error(`Failed to delete file: ${identityProofPath}`, err);
      // Optionally handle the file deletion failure, e.g., log the error for manual cleanup
    }

    res.status(200).json({ message: 'Unclaimed doctor rejected successfully' });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error('Error rejecting doctor:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
