

import mongoose from 'mongoose';
import Admin from '../db/models/admin/admin.js';
import { ServerApiVersion } from 'mongodb';

const URI = ""; /// you add your uri here when wanting to insert the admin user

mongoose.connect(URI, {
  serverApi: ServerApiVersion.v1,
}).then(() => console.log('Successfully connected to MongoDB using Mongoose.'))
  .catch(err => console.error('Connection error', err));


const insertAdmin = async () => {
  try {
    const newAdmin = new Admin({
      username: '',
      password: ''
    });

    await newAdmin.save();
    console.log('Admin user inserted successfully');
  } catch (error) {
    console.error('Error inserting admin user:', error);
  } finally {
    mongoose.connection.close();
  }
};

insertAdmin();