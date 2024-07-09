import jwt from 'jsonwebtoken';
import Doctor from '../db/models/doctor.js';
import Pharmacy from '../db/models/pharmacy.js';

/// protect methods are used to protect the routes from unauthorized access - for important endpoints
/// the methods do more or less the same thing but for different roles and with different aproaches - not sure which ones are better
export const protectPharmacy = async (req, res, next) => {
  let token;

  ///console.log("Cookies: ", req.cookies);
  ///console.log("Token: ", req.cookies.token);

  // Check if token is in cookies
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
    console.log("Token from cookies: ", token);
  }
  // Fallback to Authorization header - basically useless in our case
  else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded: ", decoded);
    req.user = await Pharmacy.findById(decoded.id).select('-password');
    console.log("User: ", req.user);
    next();
    console.log("Success");
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

export const protectDoctor = async (req, res, next) => {
  let token;

  ///console.log("Cookies: ", req.cookies);
  ///console.log("Token: ", req.cookies.token);

  // Check if token is in cookies
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
    console.log("Token from cookies: ", token);
  }
  // Fallback to Authorization header - basically useless in our case
  else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }


  if (!token) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded: ", decoded);
    req.user = await Doctor.findById(decoded.id).select('-password');
    console.log("User: ", req.user);
    next();
    console.log("Success");
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Token is not valid' });
  }
};


/// for checking if we are logged in as a pharmacy in real time - without lookup in the database
export const checkAuthPharmacy = (req, res) => {
  if (req.cookies.token) {
    try {
      const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);

      console.log("Role: ", decoded.role);

      if(decoded.role !== 'pharmacy') {
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

/// for checking if we are logged in as a doctor in real time - without lookup in the database
/// better for using in the frontend - for redirecting to the correct page
export const checkAuthDoctor = (req, res) => {
  if (req.cookies.token) {
    try {
      const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);

      console.log("Role: ", decoded.role);

      if(decoded.role !== 'doctor') {
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