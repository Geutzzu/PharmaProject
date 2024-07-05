import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

function EditTeamPrincipalForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');

    const location = useLocation();
    console.log(location.state, 1);

    const { teamPrincipal: teamDataToEdit, teamId: teamId } = location.state;

    console.log(teamDataToEdit, 2);
    console.log(teamId, 3);
    console.log(typeof teamId, 4);

    useEffect(() => {
        setFirstName(teamDataToEdit.firstName);
        setLastName(teamDataToEdit.lastName);
        setAge(teamDataToEdit.age);
    }, [teamDataToEdit]);

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch(`http://localhost:5500/updateTeamPrincipal/${teamId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                teamId: teamId,
                newPrincipal: {
                    firstName: firstName,
                    lastName: lastName,
                    age: age
                }
            })
        })
        .then(response => {
            if (response.ok) {
                console.log('Team principal edited successfully');
                window.history.back();
                console.log(response);
            } else {
                console.error('Failed to edit team principal');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };


    return (
        <div className="container">
            <h2>Edit Team Principal</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label>First Name</label>
                    <input type="text" className="form-control" value={firstName} onChange={e => setFirstName(e.target.value)} />
                </div>
                <div className="form-group mb-3">
                    <label>Last Name</label>
                    <input type="text" className="form-control" value={lastName} onChange={e => setLastName(e.target.value)} />
                </div>
                <div className="form-group mb-3">
                    <label>Age</label>
                    <input type="number" className="form-control" value={age} onChange={e => setAge(e.target.value)} />
                </div>
                <button type="submit" className="button">Update Team Principal</button>

                <Link to="/"> 
                    <button className="exit-button">Back to Teams</button>
                </Link>
            </form>
        </div>
    );
}

export default EditTeamPrincipalForm;