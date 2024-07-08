import express from 'express';
import { check, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import User from '../db/models/user.js';
import { protect, checkAuth } from "../middleware/auth.js";

const router = express.Router();

const createToken = (user) => {


  return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const sendTokenResponse = (user, res) => {
  const token = createToken(user);
  const options = {
    httpOnly: true,
    expires: new Date(Date.now() + process.env.JWT_EXPIRES_IN * 1000),
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
  };

  res.cookie('token', token, options).json({ success: true });
};

router.post(
  '/register',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }

      user = new User({ username, email, password });
      await user.save();

      sendTokenResponse(user, res);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

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
      const user = await User.findOne({ email });
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


router.get('/auth/logout', protect, (req, res) => {
  res.cookie('token', '', { expires: new Date(0) });
  res.status(200).json({ message: 'Logged out successfully' });
});


router.get('/check', checkAuth);

export default router;
