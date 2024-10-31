// components/Table.jsx
import React from 'react';

const Table = ({ columns, data }) => {
  return (
    <div className="overflow-x-auto w-full bg-white rounded-lg shadow-md p-4">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-primaryBlue text-white text-sm font-medium rounded-lg">
            {columns.map((col, index) => (
              <th
                key={col}
                className={`px-4 py-3 ${index === 0 ? 'rounded-tl-lg' : ''} ${
                  index === columns.length - 1 ? 'rounded-tr-lg' : ''
                } text-left`}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`${
                rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'
              } hover:bg-gray-100 transition-colors border-b last:border-b-0`}
            >
              {columns.map((col, colIndex) => (
                <td
                  key={colIndex}
                  className={`px-4 py-3 text-sm text-gray-600 ${
                    colIndex === 0 ? 'rounded-bl-lg' : ''
                  } ${colIndex === columns.length - 1 ? 'rounded-br-lg' : ''}`}
                >
                  {row[col]} {/* This could be text, a button, link, etc. */}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
