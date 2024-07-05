import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Constructors from './pages/Constructors.js'; 
import Drivers from './pages/Drivers.js'; 

function App() {
  return (
      <div>
        <Constructors />
      </div>
  ); 
}

export default App;