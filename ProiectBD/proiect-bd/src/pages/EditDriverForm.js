import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

function EditDriverForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [nationality, setNationality] = useState('');
    const [age, setAge] = useState('');
    const [raceWins, setRaceWins] = useState('');
    const [podiums, setPodiums] = useState('');
    const [polePositions, setPolePositions] = useState('');
    const [worldChampionships, setWorldChampionships] = useState('');
    const [formerTeams, setFormerTeams] = useState([]);

    const location = useLocation();
    console.log(location.state, 1);

    const { driverDataToEdit } = location.state;

    console.log(driverDataToEdit);

    useEffect(() => {
        setFirstName(driverDataToEdit.firstName);
        setLastName(driverDataToEdit.lastName);
        setNationality(driverDataToEdit.nationality);
        setAge(driverDataToEdit.age);
        setRaceWins(driverDataToEdit.stats.raceWins);
        setPodiums(driverDataToEdit.stats.podiums);
        setPolePositions(driverDataToEdit.stats.polePositions);
        setWorldChampionships(driverDataToEdit.stats.worldChampionships);
        setFormerTeams(driverDataToEdit.stats.formerTeams);
    }, [driverDataToEdit]);

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch(`http://localhost:5500/updateDriver/${driverDataToEdit._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                driverId: driverDataToEdit._id,
                newFirstName: firstName,
                newLastName: lastName,
                newNationality: nationality,
                newAge: parseInt(age, 10),
                newStats: {
                    raceWins: parseInt(raceWins, 10),
                    podiums: parseInt(podiums, 10),
                    polePositions: parseInt(polePositions, 10),
                    worldChampionships: parseInt(worldChampionships, 10),
                    formerTeams: formerTeams.map(team => team.trim())
                }
            })
    })
        .then(response => {
            if (response.ok) {
                console.log('Driver edited successfully');
                window.history.back();
            } else {
                console.error('Failed to edit driver');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <div className="container">
            <h2>Edit Driver</h2>
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
                    <label>Nationality</label>
                    <input type="text" className="form-control" value={nationality} onChange={e => setNationality(e.target.value)} />
                </div>
                <div className="form-group mb-3">
                    <label>Age</label>
                    <input type="number" className="form-control" value={age} onChange={e => setAge(e.target.value)} />
                </div>
                <div className="form-group mb-3">
                    <label>Race Wins</label>
                    <input type="number" className="form-control" value={raceWins} onChange={e => setRaceWins(e.target.value)} />
                </div>
                <div className="form-group mb-3">
                    <label>Podiums</label>
                    <input type="number" className="form-control" value={podiums} onChange={e => setPodiums(e.target.value)} />
                </div>
                <div className="form-group mb-3">
                    <label>Pole Positions</label>
                    <input type="number" className="form-control" value={polePositions} onChange={e => setPolePositions(e.target.value)} />
                </div>
                <div className="form-group mb-3">
                    <label>World Championships</label>
                    <input type="number" className="form-control" value={worldChampionships} onChange={e => setWorldChampionships(e.target.value)} />
                </div>
                <div className="form-group mb-3">
                    <label>Former Teams</label>
                    <input type="text" className="form-control" value={formerTeams.join(', ')} onChange={e => setFormerTeams(e.target.value.split(', '))} />
                </div>
                <button type="submit" className="button">Update Driver</button>

                <Link to="/"> 
                    <button className="exit-button">Back to Drivers</button>
                </Link>
                </form>
        </div>
    );

}

export default EditDriverForm;


