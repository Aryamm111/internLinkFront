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
  const updateStudent = async (updateData) => {
    try {
      const response = await axios.put(
        "http://localhost:8081/api/students/update",
        updateData,
        { withCredentials: true }
      );
      setStudents((prev) =>
        prev.map((s) =>
          s.studentId === response.data.studentId ? response.data : s
        )
      );
      return response.data;
    } catch (error) {
      console.error("Error updating student:", error);
      throw error;
    }
  };

  const assignCompanySupervisor = async (supervisorId, studentIds) => {
    if (!supervisorId || studentIds.length === 0) return;

    try {
      await axios.post(
        `http://localhost:8081/api/students/add?supervisorId=${supervisorId}`,
        studentIds,
        { withCredentials: true }
      );

      // Optionally update local state if needed
      setStudents((prev) =>
        prev.map((s) =>
          studentIds.includes(s.studentId)
            ? { ...s, companySupervisorId: supervisorId }
            : s
        )
      );

      return true;
    } catch (error) {
      console.error("Error assigning company supervisor:", error);
      throw error;
    }
  };

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
        fetchStudents,
        assignCompanySupervisor,
        updateStudent,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};
