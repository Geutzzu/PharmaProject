import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import styles from './Navbar.module.css';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [isDoctorDropdownOpen, setIsDoctorDropdownOpen] = useState(false);
  const [isPharmacyDropdownOpen, setIsPharmacyDropdownOpen] = useState(false);

  const handleDoctorDropdownToggle = () => {
    setIsDoctorDropdownOpen(!isDoctorDropdownOpen);
  };

  const handlePharmacyDropdownToggle = () => {
    setIsPharmacyDropdownOpen(!isPharmacyDropdownOpen);
  };

  const renderDoctorLinks = () => (
    <>
      <div className={styles.navbarItem}>
        <Link to="/get-doctor-patients" className={styles.navbarLink}>
          Patients
        </Link>
      </div>
      <div className={styles.navbarItem} onClick={handleDoctorDropdownToggle}>
        <span className={styles.navbarLink}>Profile</span>
        {isDoctorDropdownOpen && (
          <div className={styles.dropdown}>
            <Link to="/profile/details" className={styles.dropdownItem}>
              Details
            </Link>
            <Link to="/auth/logout" className={styles.dropdownItem}>
              Logout
            </Link>
          </div>
        )}
      </div>
    </>
  );

  const renderPharmacyLinks = () => (
    <>
      <div className={styles.navbarItem}>
        <Link to="/orders" className={styles.navbarLink}>
          Orders
        </Link>
      </div>
      <div className={styles.navbarItem} onClick={handlePharmacyDropdownToggle}>
        <span className={styles.navbarLink}>Profile</span>
        {isPharmacyDropdownOpen && (
          <div className={styles.dropdown}>
            <Link to="/profile/details" className={styles.dropdownItem}>
              Details
            </Link>
            <Link to="/auth/logout" className={styles.dropdownItem}>
              Logout
            </Link>
          </div>
        )}
      </div>
    </>
  );

  const { isAuthDoctor, isAuthPharmacy } = useAuth();

  if (!isAuthDoctor && !isAuthPharmacy) {
    return null;
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarLogo}>
        <img src={logo} alt="Logo" />
        <h2>Welcome to Pharma!</h2>
      </div>
      <div className={styles.navbarMenu}>
        {isAuthDoctor && renderDoctorLinks()}
        {isAuthPharmacy && renderPharmacyLinks()}
      </div>
    </nav>
  );
};

export default Navbar;