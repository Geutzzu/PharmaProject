import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Prescription from '../db/models/prescription.js'; 
import Doctor from '../db/models/doctor.js';
import Patient from '../db/models/patient.js';

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

const medicationNames = ['Ibuprofen', 'Paracetamol', 'Amoxicilină', 'Metformină', 'Amlodipină', 'Omeprazol', 'Simvastatină'];
const dosages = ['100mg', '200mg', '500mg', '10mg', '20mg', '40mg'];
const administrations = ['Oral', 'Intravenos', 'Topic', 'Inhalator'];
const concentrations = ['5%', '10%', '15%', '20%'];

const firstNames = ['Andrei', 'Ioana', 'Maria', 'Mihai', 'Elena', 'Gabriel', 'Cristina', 'Alexandru', 'Ana', 'Ion'];
const lastNames = ['Popescu', 'Ionescu', 'Georgescu', 'Dumitrescu', 'Stan', 'Stoica', 'Marin', 'Nicolae', 'Diaconu', 'Lungu'];

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Generate random prescriptions
const generatePrescriptions = async (doctorId, patientId, numberOfPrescriptions = 1000) => {
  const session = await mongoose.startSession();
  let retryCount = 0;
  const maxRetries = 5;

  while (retryCount < maxRetries) {
    session.startTransaction();
    try {
      const doctor = await Doctor.findById(doctorId).session(session);
      const patient = await Patient.findById(patientId).session(session);

      if (!doctor || !patient) {
        console.error('Doctor or Patient not found');
        await session.abortTransaction();
        session.endSession();
        return;
      }

      for (let i = 0; i < numberOfPrescriptions; i++) {
        const prescriptionData = {
          medications: [
            {
              name: getRandomElement(medicationNames),
              dosage: getRandomElement(dosages),
              quantity: Math.floor(Math.random() * 10) + 1,
              administration: getRandomElement(administrations),
              concentration: getRandomElement(concentrations)
            }
          ],
          patientId: patient._id,
          doctorId: doctor._id,
          notes: `Prescripție ${i + 1}`
        };

        try {
          const newPrescription = new Prescription(prescriptionData);
          await newPrescription.save({ session });
        } catch (err) {
          console.error(`Error saving prescription ${i + 1}:`, err);
          await session.abortTransaction();
          session.endSession();
          return;
        }

        if (i % 100 === 0) {
          console.log(`${i + 1} prescripții create...`);
        }
      }

      await session.commitTransaction();
      console.log('Toate prescripțiile au fost create.');
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
  const patientId = '66a94e9f36a38979a36c0fbd'; // Replace with the actual patient ID
  await generatePrescriptions(doctorId, patientId, 1000); // Adjust the number of prescriptions as needed
  mongoose.connection.close(); // Close the connection after completion
};

runScript();
