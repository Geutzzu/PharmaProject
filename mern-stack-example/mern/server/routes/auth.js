import express from 'express';
import { check, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import Doctor from '../db/models/doctor.js';
import Pharmacy from '../db/models/pharmacy.js';
import { protect, checkAuth, checkAuthPharmacy, checkAuthDoctor } from "../middleware/auth.js";

const router = express.Router();

const createToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};

const sendTokenResponse = (user, res) => {
  const token = createToken(user);
  const options = {
    httpOnly: true,
    expires: new Date(Date.now() + process.env.JWT_EXPIRES_IN * 1000),
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
  };

  res.cookie('token', token, options).json({ success: true, token });
};

// Register Pharmacy
router.post(
  '/register/pharmacy',
  [
    check('pharmacyName', 'Pharmacy name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('phone', 'Please include a valid phone number').isMobilePhone(),
    check('password', 'Password must be 8 or more characters').isLength({ min: 8 }),
    check('address', 'Address is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { pharmacyName, email, phone, password, address } = req.body;

    try {
      let user = await Pharmacy.findOne({ email }) || await Doctor.findOne({ email });
      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }

      user = new Pharmacy({ pharmacyName, email, phone, password, address, role: 'pharmacy' });
      await user.save();

      sendTokenResponse(user, res);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// Register Doctor
router.post(
  '/register/doctor',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('phone', 'Please include a valid phone number').isMobilePhone(),
    check('password', 'Password must be 8 or more characters').isLength({ min: 8 }),
    check('firstname', 'First name is required').not().isEmpty(),
    check('lastname', 'Last name is required').not().isEmpty(),
    check('codparafa', 'Cod Parafa is required').not().isEmpty(),
    check('clinicName', 'Clinic name is required').not().isEmpty(),
    check('clinicAddress', 'Clinic address is required').not().isEmpty(),
    check('clinicPhone', 'Please include a valid clinic phone number').isMobilePhone(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, phone, password, firstname, lastname, codparafa, clinicName, clinicAddress, clinicPhone } = req.body;

    try {
      let user = await Doctor.findOne({ email }) || await Pharmacy.findOne({ email });
      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }

      user = new Doctor({ username, email, phone, password, firstname, lastname, codparafa, clinicName, clinicAddress, clinicPhone, role: 'doctor' });
      await user.save();

      sendTokenResponse(user, res);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// Login
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await Pharmacy.findOne({ email }) || await Doctor.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      sendTokenResponse(user, res);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// Logout
router.get('/auth/logout', protect, (req, res) => {
  res.cookie('token', '', { expires: new Date(0) });
  res.status(200).json({ message: 'Logged out successfully' });
});

// Check Auth
router.get('/check/pharmacy', checkAuthPharmacy);
router.get('/check/doctor', checkAuthDoctor);

export default router;
