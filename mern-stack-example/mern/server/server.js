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


dotenv.config();


const PORT = process.env.PORT || 5050;

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // Change this to your client's origin
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/api', doctorRoutes);
app.use('/api', pharmacyRoutes);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
