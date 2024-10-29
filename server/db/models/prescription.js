import mongoose from 'mongoose';
import { customAlphabet } from 'nanoid';

// Generate a nanoid instance
const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);

const medicationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Medication name is required'],
        trim: true,
        minlength: [2, 'Medication name must be at least 2 characters long']
    },
    dosage: {
        type: String,
        required: [true, 'Dosage is required'],
        trim: true
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [1, 'Quantity must be at least 1']
    },
    administration: {
        type: String,
        required: false,
        trim: true
    },
    concentration: {
        type: String,
        required: false,
        trim: true
    }
});

const prescriptionSchema = new mongoose.Schema({

    prescriptionID: {
        type: String,
        default: () => nanoid(),
        unique: true,
        required: [true, 'Prescription ID is required']
    },

    medications: {
        type: [medicationSchema],
        required: [true, 'Medications are required']
    },

    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: [true, 'Patient ID is required']
    },

    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: [true, 'Doctor ID is required']
    },

    pharmacyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pharmacy',
        required: false
    },

    notes: {
        type: String,
        trim: true
    }

}, { timestamps: true });

const Prescription = mongoose.model('Prescription', prescriptionSchema);

export default Prescription;
