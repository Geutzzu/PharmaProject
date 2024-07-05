import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

function AddConstructorForm() {
    const [name, setName] = useState('');
    const [constructorsChampionships, setConstructorsChampionships] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');


    const handleSubmit = (event) => {
        event.preventDefault();

        fetch('http://localhost:5500/addConstructor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                constructorsChampionships: parseInt(constructorsChampionships, 10),
                teamPrincipal: {
                    firstName: firstName,
                    lastName: lastName,
                    age: parseInt(age, 10)
                },
            })
        })
        .then(response => {
            if (response.ok) {
                console.log('Team added successfully');
                window.history.back();
            } else {
                console.error('Failed to add team');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <div className="container">
            <h2>Add Team</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Team Name</label>
                    <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="constructorsChampionships" className="form-label">Constructors Championships</label>
                    <input type="number" className="form-control" id="constructorsChampionships" value={constructorsChampionships} onChange={(e) => setConstructorsChampionships(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">Team Principal First Name</label>
                    <input type="text" className="form-control" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Team Principal Last Name</label>
                    <input type="text" className="form-control" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="age" className="form-label">Team Principal Age</label>
                    <input type="number" className="form-control" id="age" value={age} onChange={(e) => setAge(e.target.value)} />
                </div>
                <button type="submit" className="button">Submit</button>
                <Link to="/">
                    <button type="button" className="exit-button">Back to Teams</button>
                </Link>
            </form>
        </div>
    );
}

export default AddConstructorForm;