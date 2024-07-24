import React from 'react';
import { useAuth } from './AuthContext';
import styles from './Footer.module.css';

const Footer = () => {
  const { isAuthDoctor, isAuthPharmacy } = useAuth();

  if (!isAuthDoctor && !isAuthPharmacy) {
    return null; // Don't render the footer if not logged in
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <p>&copy; 2024 Your Company. All rights reserved.</p>
        </div>
        <div className={styles.footerSection}>
          <a href="/contact" className={styles.footerLink}>
            Contact Us: +40 0753315996
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
