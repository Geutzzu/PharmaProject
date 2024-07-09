/// prescription.js

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';
import { type } from 'os';



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
    }
});

const prescriptionSchema = new mongoose.Schema({

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
        required: false,
    },

    notes: {
        type: String,
        trim: true
    }

}, { timestamps: true });

const Prescription = mongoose.model('Prescription', prescriptionSchema);

export default Prescription;