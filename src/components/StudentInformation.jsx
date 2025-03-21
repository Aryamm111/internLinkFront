import React, { useState } from "react";
import { useStudents } from "../context/StudentContext";
import { useUser } from "../context/UserContext";
import Table from "./Table";
import AddStudentModal from "./AddStudentModal";
import ViewStudentModal from "./ViewStudentModal";

export const StudentInformation = () => {
  const { students } = useStudents();
  const { userRole } = useUser();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  const handleViewClick = (studentId) => {
    setSelectedStudentId(studentId);
    setShowViewModal(true);
  };

  return (
    <div className="min-h-screen p-8 w-full">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Student Information
      </h1>

      <div className="w-full bg-gray-100 shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow">
        {students.length === 0 ? (
          <p className="text-center text-gray-600">No students available</p>
        ) : (
          <Table
            columns={[
              {
                header: "No.",
                key: "index",
                render: (_, __, rowIndex) => rowIndex + 1,
              },
              { header: "Student Name", key: "name" },
              { header: "Student ID", key: "studentId" },
              { header: "Email", key: "email" },
              {
                header: "Action",
                key: "action",
                render: (_, row) => (
                  <button
                    className="bg-blue-500 text-white px-4 py-1 rounded-xl hover:bg-blue-600 transition-colors duration-300"
                    onClick={() => handleViewClick(row.studentId)}
                  >
                    View
                  </button>
                ),
              },
            ]}
            data={students}
            showAddButton={true}
            onAddClick={() => setShowAddModal(true)}
          />
        )}
      </div>

      <AddStudentModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
      <ViewStudentModal
        show={showViewModal}
        onClose={() => setShowViewModal(false)}
        studentId={selectedStudentId}
      />
    </div>
  );
};

export default StudentInformation;
