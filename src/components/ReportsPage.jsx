
import Table from './Table';
import React, { useState } from 'react';
// import { useReports } from '../ReportsContext';

export const ReportsPage = ({ userRole }) => {
  const [reports, setReports] = useState([
    { id: 1, studentName: 'Alice Johnson', dueDate: '2025-03-05', status: 'Pending', fileUrl: 'https://example.com/report1.pdf' },
    { id: 2, studentName: 'Bob Smith', dueDate: '2025-03-04', status: 'Verified', fileUrl: 'https://example.com/report2.pdf' },
  ]);

  const columns = [
    { header: 'No.', key: 'index' }, // Index column for numbering
    { header: 'Student Name', key: 'studentName' },
    { header: 'Submission Date', key: 'dueDate' },
    {
      header: 'Status',
      key: 'status',
      className: (value) => (value === 'Verified' ? 'text-green-600' : 'text-red-600'),
    },
    {
      header: 'Action',
      key: 'action',
      render: (_, row) => (
        <div className="flex gap-2">
          <button
            className="bg-blue-500 text-white px-4 py-1 rounded-xl hover:bg-blue-600 transition-colors duration-300"
            onClick={() => window.open(row.fileUrl, '_blank')} // Open report in new tab
          >
            View
          </button>
          {userRole === 'companySupervisor' && row.status === 'Pending' && (
            <button
              className="bg-green-500 text-white px-4 py-1 rounded-xl hover:bg-green-600 transition-colors duration-300"
              onClick={() => console.log('Verify Report', row.id)} 
            >
              Verify
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-left">Reports</h1>
      <div className="flex justify-center">
        <div className="bg-gray-100 shadow-lg rounded-lg p-8 w-full lg:max-w-7xl xl:max-w-90% hover:shadow-xl transition-shadow">
          <Table columns={columns} data={reports} />
        </div>
      </div>
    </div>
  );
};
