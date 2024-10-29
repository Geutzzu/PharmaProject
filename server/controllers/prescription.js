import Patient from '../db/models/patient.js';
import Prescription from '../db/models/prescription.js';

const getPatientPrescriptionsWithPagination = async (req, res) => {
  const { page = 1, pageSize = 30 } = req.query;
  const patientId = req.params.patientId;

  const limit = parseInt(pageSize, 10);
  const skip = (page - 1) * limit;

  console.log('Patient ID: ', patientId);

  try {
    // Check if patient exists
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Count total prescriptions for the patient
    const totalPrescriptions = await Prescription.countDocuments({ patientId });

    // Retrieve paginated prescriptions
    const prescriptions = await Prescription.find({ patientId })
      .sort({ createdAt: -1 }) // Sort by creation date, descending
      .skip(skip)
      .limit(limit)
      .populate('doctorId', 'name') // Optional: populate doctor details if needed
      .populate('pharmacyId', 'pharmacyName'); // Optional: populate pharmacy details if needed

    const totalPages = Math.ceil(totalPrescriptions / limit);

    res.json({
      totalPrescriptions,
      page: parseInt(page, 10),
      pageSize: limit,
      totalPages,
      prescriptions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

export default getPatientPrescriptionsWithPagination;
