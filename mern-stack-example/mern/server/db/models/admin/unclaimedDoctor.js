import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';

const unclaimedDoctorSchema = new mongoose.Schema({
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
    enum: ['doctor', 'pharmacy']
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
  patients: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient'
  }],
  identityProof: {
    type: String,
    required: [true, 'Identity proof is required'],
    trim: true
  }
}, { timestamps: true });

unclaimedDoctorSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

unclaimedDoctorSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

/// unclaimedDoctorSchema.set('toObject', { virtuals: true });
/// unclaimedDoctorSchema.set('toJSON', { virtuals: true });

const UnclaimedDoctor = mongoose.model('UnclaimedDoctor', unclaimedDoctorSchema);

export default UnclaimedDoctor;
