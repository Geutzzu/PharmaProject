import React from 'react';
import { Link } from 'react-router-dom';
import  styles from './LoginOrRegister.module.css';



const LoginOrRegister = () => {
    return (
        
        <div className={styles.container1}>
            <h1 class="text-3xl font-bold text-center">Welcome to Phrarma chestie </h1>
            <div class={styles.container}>
                <Link to="/auth/login" className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-150 ease-in-out">Login</Link>
                <Link to="/auth/register/doctor" className="inline-block ml-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-150 ease-in-out">Register a doctor</Link>
                <Link to="/auth/register/pharmacy" className="inline-block ml-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-150 ease-in-out">Register a pharmacy</Link>
            </div>
        </div>
    );
    }
export default LoginOrRegister;