import Doctor from '../db/models/doctor.js';

const getDoctorPatientsWithPagination = async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;

  const limit = parseInt(pageSize);
  const skip = (page - 1) * limit;

  try {
    const doctor = await Doctor.findById(req.user.id);

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Count total patients
    const totalPatients = doctor.patients.length;

    console.log('Total patients:', totalPatients);

    // Retrieve paginated patients
    const patients = await Doctor.findById(req.user.id)
      .populate({
        path: 'patients',
        options: {
          sort: { createdAt: -1 },
          skip,
          limit,
        },
      })
      .then(doctor => doctor.patients);

    const totalPages = Math.ceil(totalPatients / limit);

    res.json({
      totalPatients,
      page: parseInt(page),
      pageSize: limit,
      totalPages,
      patients,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

export default getDoctorPatientsWithPagination;
