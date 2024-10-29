import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import genericStyles from '../Tests/Components.module.css'; // Using the generic styles
import styles from './PatientDetails.module.css'; // Importing the local styles
import Pagination from './Pagination'; // Importing the Pagination component

const downArrow = (
  <svg
    width="30"
    height="30"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7 10l5 5 5-5"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const RefreshIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`${styles.refreshIcon}`} height="24px" width="23px" fill='white' version="1.1" id="Capa_1" viewBox="0 0 489.645 489.645" xml:space="preserve">
    <g>
      <path d="M460.656,132.911c-58.7-122.1-212.2-166.5-331.8-104.1c-9.4,5.2-13.5,16.6-8.3,27c5.2,9.4,16.6,13.5,27,8.3   c99.9-52,227.4-14.9,276.7,86.3c65.4,134.3-19,236.7-87.4,274.6c-93.1,51.7-211.2,17.4-267.6-70.7l69.3,14.5   c10.4,2.1,21.8-4.2,23.9-15.6c2.1-10.4-4.2-21.8-15.6-23.9l-122.8-25c-20.6-2-25,16.6-23.9,22.9l15.6,123.8   c1,10.4,9.4,17.7,19.8,17.7c12.8,0,20.8-12.5,19.8-23.9l-6-50.5c57.4,70.8,170.3,131.2,307.4,68.2   C414.856,432.511,548.256,314.811,460.656,132.911z"/>
    </g>
  </svg>
);

const PatientDetails = () => {
  const { patientId } = useParams();
  const [patient, setPatient] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);
  const [expandedMedications, setExpandedMedications] = useState({});
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalNumberOfPrescriptions, setTotalNumberOfPrescriptions] = useState(0);
  const [totalItemsPerPage, setTotalItemsPerPage] = useState(0);

  const fetchPatientData = async (page = 1) => {
    try {
      setLoading(true);
      const patientRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/patients/${patientId}`, { withCredentials: true });
      setPatient(patientRes.data);

      const prescriptionsRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/patients/${patientId}/prescriptions?page=${page}`, { withCredentials: true });
      console.log(prescriptionsRes.data);
      const { prescriptions: prescriptionsData, totalPages, page: currentPage, totalPrescriptions } = prescriptionsRes.data;
      const url = import.meta.env.VITE_API_URL;
      console.log("URL: ", url);

      const formattedPrescriptions = prescriptionsData.map(prescription => {
        const createdAtDate = new Date(prescription.createdAt);
        const updatedAtDate = new Date(prescription.updatedAt);

        const formattedDate = createdAtDate.toISOString().split('T')[0];
        const formattedUpdatedDate = `${updatedAtDate.toISOString().split('T')[0]} - ${updatedAtDate.getHours()}:${String(updatedAtDate.getMinutes()).padStart(2, '0')}`;

        return {
          ...prescription,
          date: formattedDate,
          status: prescription.pharmacyId ? `Revendicat la  ${prescription.pharmacyId.pharmacyName} in data de ${formattedUpdatedDate}` : 'Nerevendicat'
        };
      });

      setPrescriptions(formattedPrescriptions);
      setTotalPages(totalPages);
      setCurrentPage(currentPage);
      setTotalNumberOfPrescriptions(totalPrescriptions);
      setTotalItemsPerPage(prescriptionsData.length);
    } catch (err) {
      console.error(err);
      alert('Error retrieving patient details or prescriptions!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatientData();
  }, [patientId]);

  const toggleMedications = (prescriptionId) => {
    setExpandedMedications(prevState => ({
      ...prevState,
      [prescriptionId]: !prevState[prescriptionId]
    }));
  };

  const handlePageChange = (page) => {
    fetchPatientData(page);
  };

  if (!patient) return <div className={genericStyles.loading}>Loading...</div>;

  return (
    <div className={genericStyles.container}>
      <h2 className={genericStyles.header}>Detalii Pacient</h2>
      <div className={`${genericStyles.flexColumn} ${genericStyles.card}`}>
        <p><strong>Prenume:</strong> {patient.firstName}</p>
        <p><strong>Nume de Familie:</strong> {patient.lastName}</p>
        <p><strong>CNP:</strong> {patient.CNP}</p>
        <p><strong>Telefon:</strong> {patient.phone}</p>
        <p><strong>Email:</strong> {patient.email}</p>
      </div>

      <div className={genericStyles.card}>
        <h2 className={`${genericStyles.subheader}`}>Retete</h2>
        <div className={styles.refreshContainer}>
          <Link to={`/create-prescription/${patientId}`} className={` ${genericStyles.button} `}>Creeaza o reteta</Link>
          <button
            className={`${styles.refreshButton}`}
            onClick={(event) => {
              event.target.classList.add(styles.spinning);
              console.log(event.target.classList);
              fetchPatientData(currentPage) 
              setTimeout(() => {
                event.target.classList.remove(styles.spinning);
              }, 200);
              }
            }
            disabled={loading}
          >
            <RefreshIcon/>
          </button>
        </div>
        {prescriptions.length > 0 ? (
          <div>
            <table className={`${genericStyles.table} ${styles.table}`}>
              <thead>
                <tr>
                  <th>Nr.</th>
                  <th>Data</th>
                  <th>Observatii</th>
                  <th>Medicamente</th>
                  <th>ID</th>
                  <th>Stare</th>
                </tr>
              </thead>
              <tbody>
                {prescriptions.map((prescription, index) => (
                  <tr key={prescription._id}>
                    <td>{totalNumberOfPrescriptions - (currentPage - 1) * totalItemsPerPage - index - 1}</td>
                    <td>{prescription.date}</td>
                    <td>{prescription.notes}</td>
                    <td>
                      <div className={styles.medicationsContainer}>
                        <ul className={genericStyles.list}>
                          {prescription.medications.slice(0, expandedMedications[prescription._id] ? prescription.medications.length : 1).map((medication, medIndex) => (
                            <li key={medIndex} className={`${genericStyles.listItem} ${styles.medications}`}>
                              <p><strong>Nume:</strong> {medication.name}</p>
                              <p><strong>Dozaj:</strong> {medication.dosage}</p>
                              <p><strong>Cantitate:</strong> {medication.quantity}</p>
                              {medication.administration && <p><strong>Administrare:</strong> {medication.administration}</p>}
                              {medication.concentration && <p><strong>Concentratie:</strong> {medication.concentration}</p>}
                            </li>
                          ))}
                        </ul>
                        {prescription.medications.length > 1 && (
                          <button
                            className={styles.expandButton}
                            onClick={() =>  toggleMedications(prescription._id)}
                          >
                            {downArrow}
                          </button>
                        )}
                      </div>
                      {!expandedMedications[prescription._id] && prescription.medications.length > 1 && (
                        <p>si {prescription.medications.length - 1} mai multe...</p>
                      )}
                    </td>
                    <td>{prescription.prescriptionID}</td>
                    <td className={prescription.pharmacyId ? styles.claimed : styles.unclaimed}>{prescription.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} totalItems={totalNumberOfPrescriptions} itemsPerPage={totalItemsPerPage} />
          </div>
        ) : (
          <p>Nu am gasit retete pentru pacient.</p>
        )}
      </div>
    </div>
  );
};

export default PatientDetails;
