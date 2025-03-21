import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "./UserContext";

const StudentContext = createContext();

export const useStudents = () => useContext(StudentContext);

export const StudentProvider = ({ children }) => {
  const { userRole, userId } = useUser();
  const [students, setStudents] = useState([]);

  console.log("StudentProvider - userRole:", userRole, "userId:", userId);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        if (!userRole || !userId) return;

        console.log("Fetching students with:", {
          supervisorType: userRole,
          supervisorId: userId,
        });

        const response = await axios.get("http://localhost:8081/api/students", {
          params: { supervisorType: userRole, supervisorId: userId },
          withCredentials: true,
        });

        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, [userRole, userId]);

  const assignFacultySupervisor = async (studentId) => {
    try {
      const response = await axios.post(
        `http://localhost:8081/api/students/${studentId}/add`,
        {},
        { withCredentials: true }
      );

      alert("Student assigned successfully!");

      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.studentId === studentId
            ? { ...student, assigned: true }
            : student
        )
      );

      return response.data;
    } catch (error) {
      console.error("Error assigning faculty supervisor:", error);
      alert("Failed to assign faculty supervisor.");
    }
  };


  return (
    <StudentContext.Provider
      value={{ students, assignFacultySupervisor }}
    >
      {children}
    </StudentContext.Provider>
  );
};
