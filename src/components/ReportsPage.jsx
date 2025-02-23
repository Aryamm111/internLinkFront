import React from 'react';
import Table from './Table';

export const ReportsPage = ({ userRole }) => {
  const columns = [
    { header: 'No.', key: 'id' },
    { header: 'Student Name', key: 'name' },
    { header: 'Submission Date', key: 'date' },
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
          <button className="bg-blue-500 text-white px-4 py-1 rounded-xl hover:bg-blue-600 transition-colors duration-300">
            View
          </button>
          {userRole === 'companySupervisor' && row.status === 'Pending' && (
            <button className="bg-blue-500 text-white px-4 py-1 rounded-xl hover:bg-blue-600 transition-colors duration-300">
              Verify
            </button>
          )}
        </div>
      ),
    },
  ];

  const data = [
    { id: 1, name: 'Aryam', date: '4/12/2024', status: 'Verified' },
    { id: 2, name: 'Rina', date: '3/12/2024', status: 'Pending' },
    { id: 3, name: 'Arwa', date: '3/11/2024', status: 'Pending' },
    { id: 4, name: 'Shahad', date: '1/11/2024', status: 'Verified' },
  ];

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-left">Reports</h1>
      <div className="flex justify-center">
        <div className="bg-gray-100 shadow-lg rounded-lg p-8 w-full lg:max-w-7xl xl:max-w-90% hover:shadow-xl transition-shadow">
          <Table columns={columns} data={data} userRole={userRole} />
        </div>
      </div>
    </div>
  );
};

// flag late submission ???