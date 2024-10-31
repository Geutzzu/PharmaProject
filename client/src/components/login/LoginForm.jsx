import React from 'react';
import PropTypes from 'prop-types';
import InputField from './InputField';
import Button from './Button';
import { Link } from 'react-router-dom';

const LoginForm = ({ email, setEmail, password, setPassword, handleSubmit, error }) => {
  return (
    <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-6 gap-6">
        
      <InputField
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        label="Email"
        name="email"
        required
      />
      <InputField
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        label="Parola"
        name="password"
        required
      />
      <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
        <Button type="submit">
          Login
        </Button>
        <p className="mt-4 text-sm text-gray-500 sm:mt-0">
          <b>Nu ai cont ?</b>
          <br /> Trimite o cerere pentru un cont de 
          <Link
            to="/auth/register/doctor"
            className='text-blue-600 hover:underline'
          >
            {' '}doctor{' '}
          </Link>
          sau de 
          <Link
            to="/auth/register/pharmacy"
            className='text-blue-600 hover:underline'
          >
            {' '}farmacie
          </Link>
          !
        </p>
      </div>
      {error && <p className="text-red-500 w-full mt-10">{error}</p>}
    </form>
  );
};

LoginForm.propTypes = {
  email: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default LoginForm;