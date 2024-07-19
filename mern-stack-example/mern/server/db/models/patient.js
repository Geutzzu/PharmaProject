
/// patient.js

import mongoose from 'mongoose'; /// we use this to interact with the database
import bcrypt from 'bcrypt'; //// we use this for hashing the password before saving it to the database
import db from '../connection.js'; /// we use this to connect to the database
import validator from 'validator'; /// we use this to validate the email address and others
import crypto from 'crypto'; /// we use this to encrypt and decrypt the CNP

// User schema (model for the user collection - each user will represent a document in the user collection)


const patientRecordSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
        minlength: [3, 'First name must be at least 3 characters long']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
        minlength: [3, 'Last name must be at least 3 characters long']
    },
    CNP: {
        type: String,
        required: [true, 'CNP is required'],
        unique: true,
        trim: true,
        minlength: [13, 'CNP must be at least 13 characters long']
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        unique: true,
        trim: true,
        validate: [validator.isMobilePhone, 'Invalid phone number']
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        validate: [validator.isEmail, 'Invalid email address']
    },
    
     
}, { timestamps: true });

/// if we require CNP encryption we can use the following code
/*
// Encryption function
patientRecordSchema.pre('save', function(next) {
    if (this.isModified('cnp')) {
      const cipher = crypto.createCipher('aes-256-cbc', process.env.ENCRYPTION_KEY);
      let encrypted = cipher.update(this.cnp, 'utf8', 'hex');
      encrypted += cipher.final('hex');
      this.cnp = encrypted;
    }
    next();
});
  
// Decryption method
patientRecordSchema.methods.decryptCNP = function() {
    const decipher = crypto.createDecipher('aes-256-cbc', process.env.ENCRYPTION_KEY);
    let decrypted = decipher.update(this.cnp, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};
*/


const Patient = mongoose.model('Patient', patientRecordSchema);

export default Patient;
