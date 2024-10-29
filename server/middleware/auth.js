import jwt from 'jsonwebtoken';
import Doctor from '../db/models/doctor.js';
import Pharmacy from '../db/models/pharmacy.js';
import Admin from '../db/models/admin/admin.js';
import rateLimit from 'express-rate-limit';


// Rate limiting middleware for login attempts
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per `window` (here, per 15 minutes)
  message: 'Too many login attempts from this IP, please try again after 15 minutes',
  handler: (req, res, /*next*/) => {
    res.status(429).json({ message: 'Too many login attempts from this IP, please try again after 15 minutes' });
  }
});

// Function to protect admin routes
export const protectAdmin = async (req, res, next) => {
  let token;

  // Check if token is in cookies
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  } 
  // Fallback to Authorization header
  else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await Admin.findById(decoded.id).select('-password');
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

// Function to protect pharmacy routes
export const protectPharmacy = async (req, res, next) => {
  let token;

  // Check if token is in cookies
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  } 
  // Fallback to Authorization header
  else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await Pharmacy.findById(decoded.id).select('-password');
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

// Function to protect doctor routes
export const protectDoctor = async (req, res, next) => {
  let token;

  // Check if token is in cookies
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  } 
  // Fallback to Authorization header
  else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await Doctor.findById(decoded.id).select('-password');
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

// Function to check if the user is authenticated as a pharmacy
export const checkAuthPharmacy = (req, res) => {
  if (req.cookies.token) {
    try {
      const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
      if (decoded.role !== 'pharmacy') {
        return res.json({ loggedIn: false });
      }
      return res.json({ loggedIn: true, user: decoded });
    } catch (error) {
      return res.json({ loggedIn: false });
    }
  } else {
    return res.json({ loggedIn: false });
  }
};

// Function to check if the user is authenticated as a doctor
export const checkAuthDoctor = (req, res) => {
  if (req.cookies.token) {
    try {
      const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
      if (decoded.role !== 'doctor') {
        return res.json({ loggedIn: false });
      }
      return res.json({ loggedIn: true, user: decoded });
    } catch (error) {
      return res.json({ loggedIn: false });
    }
  } else {
    return res.json({ loggedIn: false });
  }
};

// Function to check if the user is authenticated as an admin
export const checkAuthAdmin = (req, res) => {
  if (req.cookies.token) {
    try {
      const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
      if (decoded.role !== 'admin') {
        return res.json({ loggedIn: false });
      }
      return res.json({ loggedIn: true, user: decoded });
    } catch (error) {
      return res.json({ loggedIn: false });
    }
  } else {
    return res.json({ loggedIn: false });
  }
};
