// components/Card.jsx
import React from 'react';

const Card = ({ children }) => {
  return (
    <div className="border border-gray-300 rounded-lg shadow-sm bg-white m-5 p-5">
      {children}
    </div>
  );
};

export default Card;
