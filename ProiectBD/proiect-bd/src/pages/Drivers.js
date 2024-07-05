import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Drivers() {
  const [drivers, setDrivers] = useState([]);
  const [constructor, setConstructor] = useState(null);
  const [deleteMode, setDeleteMode] = useState(false);
  const { constructorId: constructorId } = useParams(); 

  console.log(useParams());
  console.log(constructorId, 1);
  console.log(typeof constructorId, 2);
  console.log(typeof useParams(), 3);

  const location = useLocation();


  useEffect(() => {
    if (constructorId) {
      fetch(`http://localhost:5500/drivers/${constructorId}`, {
        method: 'GET'
      })
      .then(response => response.json())
      .then(drivers => setDrivers(drivers))
      .catch(error => console.error('Error fetching data:', error));
    }
  }, [constructorId]);

  useEffect(() => {
    if (constructorId) {
    fetch(`http://localhost:5500/getConstructor/${constructorId}`, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(constructor => setConstructor(constructor)) 
    .catch(error => console.error('Error fetce hing data:', error));
  }
  }, [constructorId]);


  const handleDelete = (driverId) => {
    fetch(`http://localhost:5500/deleteDriver/${driverId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            setDrivers(drivers.filter(driver => driver._id !== driverId));
        }
    })
    .catch(error => console.error('Error deleting driver:', error));
  };


return(
  <div>
    <h2>Drivers</h2>
    <table className="table">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Age</th>
          <th>Nationality</th>
          <th>Stats</th>
          <th>{deleteMode ? 'Delete' : 'Edit'}</th>
        </tr>
      </thead>
      <tbody>
        {drivers.map(driver => (
          <tr key={driver._id.$oid}>
            <td>{driver.firstName}</td>
            <td>{driver.lastName}</td>
            <td>{driver.age}</td>
            <td>{driver.nationality}</td>
            <td>
              <details>
                <summary></summary>
                <ul>
                {Object.keys(driver.stats).map((statKey) => {
                  const formattedStatKey = statKey
                    .replace(/_/g, ' ')
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');

                  return (
                    <li key={statKey}>
                      {`${formattedStatKey}: ${driver.stats[statKey]}`}
                    </li>
                  );
                })}
              </ul>
              </details>
            </td>
            <td>
              {deleteMode ? (
                <button type="button" className="btn btn-danger" onClick={() => handleDelete(driver._id)}>
                  Delete
                </button>
              ) : (
                <Link to={`/updateDriver/${driver._id}`} state={{ driverDataToEdit: driver }}>
                  <button type="button" className="btn btn-primary">Edit</button>
                </Link>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <Link to="/">
      <button className="button">Back to Constructors</button>
    </Link>
    <button 
      className="exit-button" 
      style={{backgroundColor: deleteMode ? 'blue' : 'red'}}
      onClick={() => setDeleteMode(!deleteMode)}
    >
      Toggle {deleteMode ? 'Edit' : 'Delete'} Mode
    </button>
  </div>
);
};

export default Drivers;