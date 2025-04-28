import React, { useState } from "react";
import { useStudents } from "../context/StudentContext";

const AddStudentModal = ({ show, onClose }) => {
  const [studentId, setStudentId] = useState("");
  const { assignFacultySupervisor } = useStudents();

  const handleAddStudent = async () => {
    if (!studentId) {
      alert("Student ID is required!");
      return;
    }
    try {
      const response = await assignFacultySupervisor(studentId);

      if (response) {
        console.log("Student added:", response);
        onClose();
      }
    } catch (error) {
      console.error("Error adding student:", error);
      alert("Failed to add student.");
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white w-11/12 max-w-lg p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Add Student</h2>
        <label className="block mb-2 ">
          Student ID:
          <input
            type="text"
            name="studentId"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="mt-1 bg-white p-2 w-full border border-gray-300 rounded-md"
          />
        </label>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-md mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleAddStudent}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddStudentModal;
