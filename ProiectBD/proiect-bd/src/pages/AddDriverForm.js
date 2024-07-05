import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function NewDriverForm() {
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
    const { constructorId } = location.state;

    console.log(location.state, 1)
    console.log(useParams(), 2)
    console.log(constructorId, 3);
    console.log(typeof constructorId, 4)

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch('http://localhost:5500/addDriver', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                nationality: nationality,
                age: parseInt(age, 10),
                stats: {
                    raceWins: parseInt(raceWins, 10),
                    podiums: parseInt(podiums, 10),
                    polePositions: parseInt(polePositions, 10),
                    worldChampionships: parseInt(worldChampionships, 10),
                    formerTeams: formerTeams.split(',').map(team => team.trim())
                },
                constructorId: constructorId
            })
        })
        .then(response => {
            if (response.ok) {
                console.log('Driver added successfully');
                window.history.back();
            } else {
                console.error('Failed to add driver');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <div className="container">
            <h2>Add Driver</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input type="text" className="form-control" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input type="text" className="form-control" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="nationality" className="form-label">Nationality</label>
                    <input type="text" className="form-control" id="nationality" value={nationality} onChange={(e) => setNationality(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="age" className="form-label">Age</label>
                    <input type="number" className="form-control" id="age" value={age} onChange={(e) => setAge(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="raceWins" className="form-label">Race Wins</label>
                    <input type="number" className="form-control" id="raceWins" value={raceWins} onChange={(e) => setRaceWins(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="podiums" className="form-label">Podiums</label>
                    <input type="number" className="form-control" id="podiums" value={podiums} onChange={(e) => setPodiums(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="polePositions" className="form-label">Pole Positions</label>
                    <input type="number" className="form-control" id="polePositions" value={polePositions} onChange={(e) => setPolePositions(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="worldChampionships" className="form-label">World Championships</label>
                    <input type="number" className="form-control" id="worldChampionships" value={worldChampionships} onChange={(e) => setWorldChampionships(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="formerTeams" className="form-label">Former Teams</label>
                    <input type="text" className="form-control" id="formerTeams" value={formerTeams} onChange={(e) => setFormerTeams(e.target.value)} placeholder="Enter teams separated by commas" />
                </div>
                <button type="submit" className="button">Submit</button>
                <Link to="/">
                    <button type="button" className="exit-button">Back to Constructors</button>
                </Link>
            </form>

           
        </div>
    );
}

export default NewDriverForm;












/* COD PROFER PENTRU ADD PLAYER FORM */

/*import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { useLocation} from 'react-router-dom';

function NewPlayerForm() {
    const [playerName, setPlayerName] = useState('');
    const [playerNumber, setPlayerNumber] = useState('');
    const [playerPosition, setPlayerPosition] = useState('');

    const location = useLocation();
    const { teamId } = location.state;

    const handleSubmit = (event) => {
        event.preventDefault();
        
        // Send a POST request to your backend API endpoint to add the new player
        fetch('http://localhost:5050/addPlayer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: playerName,
                number: parseInt(playerNumber, 10),
                position: playerPosition,
                teamId: teamId
            })
        })
        .then(response => {
            if (response.ok) {
                console.log('Player added successfully');
                window.history.back();
            } else {
                console.error('Failed to add player');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <div className="container">
            <h2>Add Player</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="playerName" className="form-label">Player Name</label>
                    <input type="text" className="form-control" id="playerName" value={playerName} onChange={(e) => setPlayerName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="playerPosition" className="form-label">Player Position</label>
                    <input type="text" className="form-control" id="playerPosition" value={playerPosition} onChange={(e) => setPlayerPosition(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="playerNumber" className="form-label">Player Number</label>
                    <input type="text" className="form-control" id="playerNumber" value={playerNumber} onChange={(e) => setPlayerNumber(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default NewPlayerForm;
*/
