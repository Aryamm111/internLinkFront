import React from 'react';

const Table = ({ columns, data, userRole }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead className="bg-pink-100">
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="py-3 px-4 border font-medium text-gray-700">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`${rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100`}
            >
              {columns.map((col, colIndex) => (
                <td
                  key={colIndex}
                  className={`py-3 px-4 border text-black ${col.className ? col.className(row[col.key]) : ''}`}
                >
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
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
