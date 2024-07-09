/// pharmacy.js


import mongoose from 'mongoose'; /// we use this to interact with the database
import bcrypt from 'bcrypt'; //// we use this for hashing the password before saving it to the database
import db from '../connection.js'; /// we use this to connect to the database
import validator from 'validator'; /// we use this to validate the email address and others

// User schema (model for the user collection - each user will represent a document in the user collection)


const pharmacySchema = new mongoose.Schema({
    pharmacyName: {
        type: String,
        required: [true, 'Pharmacy name is required'],
        unique: true,
        trim: true,
        minlength: [3, 'Pharmacy name must be at least 3 characters long']
    },

    role: {
        type: String,
        required: [true, 'Role is required'],
        trim: true,
        enum: ['doctor', 'pharmacy'],
    },

    address: {
        type: String,
        required: [true, 'Address is required'],
        trim: true
    },

    email: { 
        type: String, 
        required: [true, 'Email is required'], 
        unique: true, 
        trim: true, 
        validate: [validator.isEmail, 'Invalid email address'] 
    },
    phone: { 
        type: String, 
        required: [true, 'Phone number is required'], 
        unique: true, 
        trim: true, 
        validate: [validator.isMobilePhone, 'Invalid phone number'] 
    },
    password: { 
        type: String, 
        required: [true, 'Password is required'], 
        minlength: [8, 'Password must be at least 8 characters long'] 
    },
     
}, { timestamps: true });

pharmacySchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
}); 

pharmacySchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const Pharmacy = mongoose.model('Pharmacy', pharmacySchema);

export default Pharmacy;
