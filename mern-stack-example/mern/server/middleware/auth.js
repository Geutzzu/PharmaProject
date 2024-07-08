import jwt from 'jsonwebtoken';
import User from '../db/models/user.js';


export const protect = async (req, res, next) => {
  let token;

  ///console.log("Cookies: ", req.cookies);
  ///console.log("Token: ", req.cookies.token);

  // Check if token is in cookies
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
    console.log("Token from cookies: ", token);
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
    console.log("Decoded: ", decoded);
    req.user = await User.findById(decoded.id).select('-password');
    console.log("User: ", req.user);
    next();
    console.log("Success");
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Token is not valid' });
  }
};


export const checkAuth = (req, res) => {
  if (req.cookies.token) {
    try {
      const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
      res.json({ loggedIn: true, user: decoded });
    } catch (error) {
      res.json({ loggedIn: false });
    }
  } else {
    res.json({ loggedIn: false });
  }
};