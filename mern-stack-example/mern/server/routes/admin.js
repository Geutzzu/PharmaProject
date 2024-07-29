import express from 'express';
import multer from 'multer';
import UnclaimedDoctor from '../db/models/admin/unclaimedDoctor.js';
import path from 'path';
import crypto from 'crypto';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

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
  try {
    const { body } = req;
    const identityProofPath = req.file.path;
    const newUnclaimedDoctor = new UnclaimedDoctor({ ...body, identityProof: identityProofPath });
    await newUnclaimedDoctor.save();
    res.status(201).json(newUnclaimedDoctor);
  } catch (error) {
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

export default router;
