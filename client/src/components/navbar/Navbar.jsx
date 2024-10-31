import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../svg/Logo';
import { useAuth } from '../AuthContext';

const Navbar = () => {
  const [isDoctorDropdownOpen, setIsDoctorDropdownOpen] = useState(false);
  const [isPharmacyDropdownOpen, setIsPharmacyDropdownOpen] = useState(false);
  const [lastClicked, setLastClicked] = useState(null);

  const { isAuthDoctor, isAuthPharmacy, isAuthAdmin, handleLogout } = useAuth();

  const handleDoctorDropdownToggle = () => setIsDoctorDropdownOpen((prev) => !prev);
  const handlePharmacyDropdownToggle = () => setIsPharmacyDropdownOpen((prev) => !prev);

  const handleLinkClick = (link) => {
    setLastClicked(link);
  };

  // Doctor links
  const renderDoctorLinks = () => (
    <>
      <li>
        <Link
          to="/get-doctor-patients"
          className={`block mt-2 rounded-lg px-4 py-2 text-m font-bold text-gray-700 hover:bg-gray-100 ${lastClicked === '/get-doctor-patients' ? 'bg-gray-100' : ''}`}
          onClick={() => handleLinkClick('/get-doctor-patients')}
        >
          Pacienti
        </Link>
        <Link
          to="/create-patient"
          className={`block mt-2 rounded-lg px-4 py-2 text-m font-bold text-gray-700 hover:bg-gray-100 ${lastClicked === '/create-patient' ? 'bg-gray-100' : ''}`}
          onClick={() => handleLinkClick('/create-patient')}
        >
          Creeaza un pacient
        </Link>
      </li>
      <li>
        <details className="group [&_summary::-webkit-details-marker]:hidden">
          <summary
            className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={handleDoctorDropdownToggle}
          >
            <span className="text-m font-bold">Profil</span>
            <span className="shrink-0 transition duration-300 group-open:-rotate-180">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </summary>
          {isDoctorDropdownOpen && (
            <ul className="mt-2 space-y-1 px-4">
              <li>
                <Link
                  to="/profile/details"
                  className={`block rounded-lg px-4 py-2 text-m font-bold text-gray-500 hover:bg-gray-100 hover:text-gray-700 ${lastClicked === '/profile/details' ? 'bg-gray-100' : ''}`}
                  onClick={() => handleLinkClick('/profile/details')}
                >
                  Detalii
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="w-full rounded-lg px-4 py-2 text-m font-bold text-gray-500 hover:bg-gray-100 hover:text-gray-700 [text-align:_inherit]"
                >
                  Logout
                </button>
              </li>
            </ul>
          )}
        </details>
      </li>
    </>
  );

  // Pharmacy links
  const renderPharmacyLinks = () => (
    <li>
      <details className="group [&_summary::-webkit-details-marker]:hidden">
        <summary
          className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100"
          onClick={handlePharmacyDropdownToggle}
        >
          <span className="text-m font-bold">Profil</span>
          <span className="shrink-0 transition duration-300 group-open:-rotate-180">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </summary>
        {isPharmacyDropdownOpen && (
          <ul className="mt-2 space-y-1 px-4">
            <li>
              <Link
                to="/profile/details"
                className={`block rounded-lg px-4 py-2 text-m font-bold text-gray-500 hover:bg-gray-100 hover:text-gray-700 ${lastClicked === '/profile/details' ? 'bg-gray-100' : ''}`}
                onClick={() => handleLinkClick('/profile/details')}
              >
                Detalii
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="w-full rounded-lg px-4 py-2 text-m font-bold text-gray-500 hover:bg-gray-100 hover:text-gray-700 [text-align:_inherit]"
              >
                Logout
              </button>
            </li>
          </ul>
        )}
      </details>
    </li>
  );

  // Admin link
  const renderAdminLinks = () => (
    <li>
      <button
        onClick={handleLogout}
        className="w-full rounded-lg px-4 py-2 text-m font-bold text-gray-500 hover:bg-gray-100 hover:text-gray-700 [text-align:_inherit]"
      >
        Logout
      </button>
    </li>
  );

  if (!isAuthDoctor && !isAuthPharmacy && !isAuthAdmin) {
    return null;
  }

  return (
    <nav className="flex flex-col h-screen w-80 border-r bg-white p-4 fixed">
      {/* Logo and Title */}
      <div className="flex items-center justify-left mb-6 ">
        <div className="grid h-10 w-16 place-content-center rounded-lg bg-white text-xs text-gray-600">
          <Logo />
        </div>
        <h2 className="text-gray-700 text-xl font-bold ml-3">Meniu</h2>
      </div>


      {/* Links and Dropdowns */}
      <ul className="space-y-2">
        <li>
          <Link
            to="/"
            className={`block rounded-lg px-4 py-2 text-m font-bold text-gray-700 hover:bg-gray-100 ${lastClicked === '/' ? 'bg-gray-100' : ''}`}
            onClick={() => handleLinkClick('/')}
          >
            General
          </Link>
        </li>
        {isAuthDoctor && renderDoctorLinks()}
        {isAuthPharmacy && renderPharmacyLinks()}
        {isAuthAdmin && renderAdminLinks()}
      </ul>
    </nav>
  );
};

export default Navbar;