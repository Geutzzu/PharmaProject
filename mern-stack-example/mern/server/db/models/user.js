import mongoose from 'mongoose'; /// we use this to interact with the database
import bcrypt from 'bcrypt'; //// we use this for hashing the password before saving it to the database
import db from '../connection.js'; /// we use this to connect to the database

// User schema (model for the user collection - each user will represent a document in the user collection)


const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
