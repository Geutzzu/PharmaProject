/*import express from "express";
import cors from "cors";
import records from "./routes/record.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/record", records);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
*/ /// codu original 

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.js';
import doctorRoutes from './routes/doctor.js';
import pharmacyRoutes from './routes/pharmacy.js';
import adminRoutes from './routes/admin.js';
import path from 'path';
import { fileURLToPath } from 'url';


dotenv.config();

const PORT = process.env.PORT || 5050;

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // Change this to your client's origin
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); /// path for storing images

app.use('/auth', authRoutes);
app.use('/api', doctorRoutes);
app.use('/api', pharmacyRoutes);
app.use('/admin', adminRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
