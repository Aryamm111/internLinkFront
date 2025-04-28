import React, { useState, useEffect } from "react";
import { useStudents } from "../context/StudentContext";
import { useUser } from "../context/UserContext";

const ViewStudentModal = ({ show, onClose, studentId }) => {
  const { students } = useStudents();
  const [studentDetails, setStudentDetails] = useState(null);
  const { userId, userRole, findEmailById } = useUser();
  const [facultyEmail, setFacultyEmail] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");

  useEffect(() => {
    if (show && studentId) {
      const student = students.find((s) => s.id === studentId);
      setStudentDetails(student || {});
      console.log("Clicked studentId:", studentId);
    }
  }, [show, studentId, students]);

  useEffect(() => {
    const fetchEmails = async () => {
      if (studentDetails?.facultySupervisorId) {
        const email = await findEmailById(studentDetails.facultySupervisorId);
        setFacultyEmail(email);
      }
      if (studentDetails?.companySupervisorId) {
        const email = await findEmailById(studentDetails.companySupervisorId);
        setCompanyEmail(email);
      }
    };

    if (studentDetails) {
      fetchEmails();
    }
  }, [studentDetails, findEmailById]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50 transition-opacity duration-300">
      <div className="bg-white w-full max-w-lg p-8 rounded-lg shadow-lg transform transition-transform duration-300">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Student Details
        </h2>
        <hr className="border-gray-300 mb-6" />

        {studentDetails ? (
          <div className="space-y-4">
            <p className="text-lg">
              <strong>Name: </strong> {studentDetails.name}
            </p>
            <p className="text-lg">
              <strong>Email: </strong> {studentDetails.email}
            </p>
            <p className="text-lg">
              <strong>Major: </strong> {studentDetails.major}
            </p>
            <p className="text-lg">
              <strong>Faculty Supervisor Email: </strong>{" "}
              {facultyEmail || "N/A"}
            </p>
            <p className="text-lg">
              <strong>Company Supervisor Email: </strong>{" "}
              {companyEmail || "N/A"}
            </p>
          </div>
        ) : (
          <p className="text-center text-gray-600">Loading...</p>
        )}
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewStudentModal;
