/// doctor.js
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';
import { type } from 'os';

const doctorSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: [true, 'Username is required'], 
    unique: true, 
    trim: true, 
    minlength: [3, 'Username must be at least 3 characters long'] 
  },

  role: {
    type: String,
    required: [true, 'Role is required'],
    trim: true,
    enum: ['doctor', 'pharmacy'],
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
  firstname: { 
    type: String, 
    required: [true, 'First name is required'], 
    trim: true 
  },
  lastname: { 
    type: String, 
    required: [true, 'Last name is required'], 
    trim: true 
  },
  codparafa: { 
    type: String, 
    required: [true, 'Cod Parafa is required'], 
    trim: true 
  },
  clinicName: { 
    type: String, 
    required: [true, 'Clinic name is required'], 
    trim: true 
  },
  clinicAddress: { 
    type: String, 
    required: [true, 'Clinic address is required'], 
    trim: true 
  },
  clinicPhone: { 
    type: String, 
    required: [true, 'Clinic phone number is required'], 
    trim: true, 
    validate: [validator.isMobilePhone, 'Invalid clinic phone number'] 
  },
}, { timestamps: true });

doctorSchema.virtual('prescriptions', {
  ref: 'Prescription',
  localField: '_id',
  foreignField: 'doctorId',
  justOne: false
}); /// we use this to create a virtual field that will be used to populate the prescriptions field in the doctor object

doctorSchema.virtual('patients', {
  ref: 'Patient',
  localField: '_id',
  foreignField: '_id',
  justOne: false,
  options: { 
    populate: { path: 'prescriptions', match: { doctorId: '$_id' } } 
  },
});


doctorSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

doctorSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

doctorSchema.set('toObject', { virtuals: true });
doctorSchema.set('toJSON', { virtuals: true });

const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;
