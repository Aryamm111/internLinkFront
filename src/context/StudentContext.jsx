import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "./UserContext";

const StudentContext = createContext();

export const useStudents = () => useContext(StudentContext);

export const StudentProvider = ({ children }) => {
  const { userRole, userId } = useUser();
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch all students once on mount
  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8081/api/students", {
        params: {
          supervisorType: userRole,
          supervisorId: userId,
        },
        withCredentials: true,
      });
      setStudents(response.data);
      if (response.data.length > 0) {
        setSelectedStudent(response.data[0]);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  // Assign supervisor (keep if needed)
  const assignFacultySupervisor = async (studentId) => {
    try {
      await axios.post(
        `http://localhost:8081/api/students/${studentId}/add`,
        {},
        { withCredentials: true }
      );
      setStudents((prev) =>
        prev.map((s) =>
          s.studentId === studentId ? { ...s, assigned: true } : s
        )
      );
    } catch (error) {
      console.error("Error assigning supervisor:", error);
      throw error;
    }
  };

  return (
    <StudentContext.Provider
      value={{
        students,
        selectedStudent,
        loading,
        setSelectedStudent,
        assignFacultySupervisor,
        fetchStudents, // Only for refresh if needed
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};
