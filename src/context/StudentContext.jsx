import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "./UserContext";

const StudentContext = createContext();

export const useStudents = () => useContext(StudentContext);

export const StudentProvider = ({ children }) => {
  const { userRole, userId } = useUser(); // Extract user role and ID from UserContext
  const [students, setStudents] = useState([]);

  console.log("StudentProvider - userRole:", userRole, "userId:", userId); // Debugging log

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        if (!userRole || !userId) return; // Ensure user is logged in

        console.log("Fetching students with:", { supervisorType: userRole, supervisorId: userId });

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
  }, [userRole, userId]); // Re-fetch students when role or ID changes

  // Function to assign a faculty supervisor to a student
  const assignFacultySupervisor = async (studentId) => {
    try {
      const response = await axios.post(
        `http://localhost:8081/api/students/${studentId}/add`, 
        {}, // No body needed
        { withCredentials: true } // Ensures authentication is sent
      );

      alert("Student assigned successfully!");

      // Refresh student list after assigning
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.studentId === studentId ? { ...student, assigned: true } : student
        )
      );

      return response.data;
    } catch (error) {
      console.error("Error assigning faculty supervisor:", error);
      alert("Failed to assign faculty supervisor.");
    }
  };

  return (
    <StudentContext.Provider value={{ students, assignFacultySupervisor }}>
      {children}
    </StudentContext.Provider>
  );
};
