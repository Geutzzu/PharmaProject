import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

function EditTeamForm() {
    const [name, setName] = useState('');
    const [constructorsChampionships, setConstructorsChampionships] = useState('');

    const location = useLocation();

    const { name: teamName, constructorsChampionships: teamChampionships, teamId: teamId } = location.state;


    console.log(teamName, 1);
    console.log(teamChampionships, 2);
    console.log(teamId, 3);
    console.log(typeof teamId, 4);

    useEffect(() => {
        setName(teamName);
        setConstructorsChampionships(teamChampionships);
    }, [teamName, teamChampionships]);

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log('handleSubmit called'); 
        console.log(`teamId: ${teamId}`); 

        fetch(`http://localhost:5500/updateTeam/${teamId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                teamId: teamId,
                name: name,
                constructorsChampionships: constructorsChampionships
            })
        })
        .then(response => {
            if (response.ok) {
                console.log('Team edited successfully');
                window.history.back();
            } else {
                console.error('Failed to edit team');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <div className="container">
            <h2>Edit Team</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label>Team Name</label>
                    <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="form-group mb-3">
                    <label>Number of Championships</label>
                    <input type="number" className="form-control" value={constructorsChampionships} onChange={e => setConstructorsChampionships(e.target.value)} />
                </div>
                <button type="submit" className="button">Update Team</button>

                <Link to="/"> 
                    <button className="exit-button">Back to Teams</button>
                </Link>
            </form>
        </div>
    );
}

export default EditTeamForm;