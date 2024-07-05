import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';

function Constructors() {
    const [constructors, setConstructors] = useState([]);
    const [deleteMode, setDeleteMode] = useState(false);


    useEffect(() => {
        fetch('http://localhost:5500/getConstructors', {
            method: 'GET'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(constructors => setConstructors(constructors))
        .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleDelete = (constructorId) => {
        fetch(`http://localhost:5500/deleteConstructor/${constructorId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                setConstructors(constructors.filter(constructor => constructor._id !== constructorId));
            }
        })
        .catch(error => console.error('Error deleting constructor:', error));
    };

    return(
        <div>
        <h2>Formula 1 2024 Constructors</h2>
    <table className="table">
        <thead>
        <tr>
            <th>Name</th>
            <th>Championships</th>
            <th>Team Principal</th>
            <th>Principal Age</th>
            <th>Drivers</th>
            <th>Add Driver</th> 
            <th>Edit Team Principal</th>
            <th>Edit Team</th>
            <th>{deleteMode && "Delete"}</th>
        </tr>
        </thead>
        <tbody>
        {constructors.map(item => (
            <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.constructorsChampionships}</td>
                <td>{item.teamPrincipal.firstName} {item.teamPrincipal.lastName}</td>
                <td>{item.teamPrincipal.age}</td>
                
                <td> 
                    <Link to={`/drivers/${item._id}`}>
                        View Drivers 
                    </Link>
                </td> 
                <td>
                    <Link to={`/addDriver`} state={{ constructorId: item._id }}>
                        Add Driver
                    </Link>
                </td>
                <td>
                <Link to={`/updateTeamPrincipal/${item._id}`} state={{ teamPrincipal: item.teamPrincipal, teamId: item._id }}>
                    Edit Team Principal
                </Link>
                
                </td>
                <td>
                <Link to={`/updateTeam/${item._id}`} state={{ name: item.name, constructorsChampionships: item.constructorsChampionships, teamId: item._id }}>
                    Edit Team
                </Link>
                </td>
                <td>
                    {deleteMode && (
                        <button type="button" className="btn btn-danger" onClick={() => handleDelete(item._id)}>
                            Delete
                        </button>
                    )}
                </td>
            </tr>
        ))}
        </tbody>
        </table>
        <Link to="/addConstructor">
            <button type="button" className="button">Add Constructor</button>
        </Link>
        <button 
            className="exit-button" 
            style={{backgroundColor: deleteMode ? 'blue' : 'red'}}
            onClick={() => setDeleteMode(!deleteMode)}
        >
            Toggle Delete Mode {deleteMode ? 'Off' : ''}
        </button>
        </div>
    );
}

export default Constructors;