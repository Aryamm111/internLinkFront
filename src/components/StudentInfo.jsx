import React from 'react';
import Table from './Table';

export const StudentInfo = ({ userRole }) => {
 
  const columns = [
    { header: 'No.', key: 'id' },
    { header: 'Student Name', key: 'name' },
    { header: 'Student ID', key: 'studentId' },
    { header: 'Email', key: 'email' },
    {
      header: 'Action',
      key: 'action',
      render: (_, row) => (
        <button className="bg-blue-500 text-white px-4 py-1 rounded-xl hover:bg-blue-600 ">
          View
        </button>
      ),
    },
  ];
  const data = [
    { id: 1, name: 'Aryam', studentId: '42777', email: 'Aryam@gmail.com' },
    { id: 2, name: 'Arwa', studentId: '425555', email: 'Arwa@gmail.com' },
    { id: 3, name: 'Shahad', studentId: '426666', email: 'shahad@gmail.com' },
    { id: 4, name: 'Rina', studentId: '426660', email: 'rina@gmail.com' },
  ];


  return (
    <div className="min-h-screen  p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-left">Student Information</h1>
      <div className="flex justify-center">
        <div className="bg-gray-100 shadow-sm rounded-lg p-8">
          <Table columns={columns} data={data} userRole={userRole} />
        </div>
        </div>
    </div>
  );
};

