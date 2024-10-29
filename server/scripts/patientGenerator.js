import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Patient from '../db/models/patient.js'; 
import Doctor from '../db/models/doctor.js'; 

dotenv.config(); // Load environment variables from .env file

// MongoDB connection URI
const URI = "";

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Successfully connected to MongoDB using Mongoose.');
  } catch (err) {
    console.error('Connection error', err);
    process.exit(1); // Exit the process with failure
  }
};

// Expanded sample data for generating random names, email providers, and phone prefixes
const firstNames = ['John', 'Jane', 'Alice', 'Bob', 'Emma', 'Michael', 'Linda', 'William', 'Olivia', 'James', 'Sophia', 'Liam', 'Noah', 'Ava', 'Isabella', 'Mason', 'Ethan', 'Lucas', 'Mia', 'Charlotte'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor', 'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin', 'Thompson', 'Garcia', 'Martinez', 'Robinson'];
const emailProviders = ['example.com', 'mail.com', 'domain.com', 'test.com', 'email.com', 'webmail.com', 'inbox.com'];
const phonePrefixes = ['071', '072', '073', '074', '075', '076', '077', '078', '079'];

// Helper function to generate random integers in a given range
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Helper function to generate a random CNP
const generateCNP = (usedCNPs) => {
  let cnp;
  do {
    cnp = String(getRandomInt(1000000000000, 9999999999999));
  } while (usedCNPs.has(cnp));
  usedCNPs.add(cnp);
  return cnp;
};

// Helper function to generate a random phone number
const generatePhone = (usedPhones) => {
  let phone;
  do {
    const prefix = phonePrefixes[getRandomInt(0, phonePrefixes.length - 1)];
    phone = prefix + String(getRandomInt(1000000, 9999999));
  } while (usedPhones.has(phone));
  usedPhones.add(phone);
  return phone;
};

// Helper function to generate a random email
const generateUniqueEmail = (firstName, lastName, usedEmails) => {
  let email;
  let counter = getRandomInt(1, 1000); // Add more randomness to the counter
  do {
    const provider = emailProviders[getRandomInt(0, emailProviders.length - 1)];
    email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${counter}@${provider}`;
    counter++;
  } while (usedEmails.has(email));
  usedEmails.add(email);
  return email;
};

// Generate a large number of patient entries
const generatePatients = async (doctorId, numberOfPatients = 10000) => {
  const session = await mongoose.startSession();
  let retryCount = 0;
  const maxRetries = 5;

  while (retryCount < maxRetries) {
    session.startTransaction();
    try {
      // Ensure the doctor exists
      const doctor = await Doctor.findById(doctorId).session(session);
      if (!doctor) {
        console.error('Doctor not found');
        await session.abortTransaction();
        session.endSession();
        return;
      }

      // Sets to store unique values
      const usedCNPs = new Set();
      const usedPhones = new Set();
      const usedEmails = new Set();

      // Creating patients in bulk
      for (let i = 0; i < numberOfPatients; i++) {
        const firstName = firstNames[getRandomInt(0, firstNames.length - 1)];
        const lastName = lastNames[getRandomInt(0, lastNames.length - 1)];
        const email = generateUniqueEmail(firstName, lastName, usedEmails);
        const cnp = generateCNP(usedCNPs);
        const phone = generatePhone(usedPhones);

        const patientData = {
          firstName,
          lastName,
          CNP: cnp,
          phone,
          email,
        };

        try {
          // Save the patient
          const newPatient = new Patient(patientData);
          await newPatient.save({ session });
          doctor.patients.push(newPatient._id);
        } catch (err) {
          console.error(`Error saving patient ${i + 1}:`, err);
          await session.abortTransaction();
          session.endSession();
          return;
        }

        if (i % 100 === 0) {
          console.log(`${i + 1} patients created...`);
        }
      }

      // Save updated doctor
      await doctor.save({ session });
      await session.commitTransaction();
      console.log('All patients created and added to the doctor.');
      break; // Exit the retry loop if successful
    } catch (err) {
      console.error(err);
      if (err.errorLabels && err.errorLabels.includes('TransientTransactionError')) {
        retryCount++;
        console.log(`Retrying transaction... Attempt ${retryCount}`);
        await session.abortTransaction();
      } else {
        await session.abortTransaction();
        break;
      }
    } finally {
      session.endSession();
    }
  }

  if (retryCount === maxRetries) {
    console.error('Max retries reached. Transaction failed.');
  }
};

// Execute the script
const runScript = async () => {
  await connectDB(); // Establish the database connection
  const doctorId = '669ad547077a634b52ab1983'; // Replace with the actual doctor ID
  await generatePatients(doctorId, 1000); // Adjust the number of patients as needed
  mongoose.connection.close(); // Close the connection after completion
};

runScript();