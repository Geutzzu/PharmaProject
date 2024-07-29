import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [unclaimedDoctors, setUnclaimedDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUnclaimedDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:5050/unclaimed-doctors');
        setUnclaimedDoctors(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUnclaimedDoctors();
  }, []);

  if (loading) return <div >Loading...</div>;
  if (error) return <div >Error: {error}</div>;

  return (
    <div >
      <h1 >Unclaimed Doctor Requests</h1>
      <table >
        <thead>
          <tr>
            <th>Username</th>
            <th>Role</th>
            <th>Email</th>
            <th>Phone</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Cod Parafa</th>
            <th>Clinic Name</th>
            <th>Clinic Address</th>
            <th>Clinic Phone</th>
            <th>Identity Proof</th>
          </tr>
        </thead>
        <tbody>
          {unclaimedDoctors.map((doctor) => (
            <tr key={doctor._id}>
              <td>{doctor.username}</td>
              <td>{doctor.role}</td>
              <td>{doctor.email}</td>
              <td>{doctor.phone}</td>
              <td>{doctor.firstname}</td>
              <td>{doctor.lastname}</td>
              <td>{doctor.codparafa}</td>
              <td>{doctor.clinicName}</td>
              <td>{doctor.clinicAddress}</td>
              <td>{doctor.clinicPhone}</td>
              <td>
                <a href={`http://localhost:5050/${doctor.identityProof}`} target="_blank" rel="noopener noreferrer">
                  View Proof
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
