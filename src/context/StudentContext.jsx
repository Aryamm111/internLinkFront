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
  const signUp = async (formData, skills) => {
    try {
      const response = await axios.post(
        "http://localhost:8081/register",
        {
          ...formData, // Includes fields like name, email, password, studentId, major, etc.
          skills, // Includes the skills array
        },
        { withCredentials: true }
      );

      alert(response.data); // Notify user of success
      navigate("/login"); // Redirect to the login or dashboard page
    } catch (error) {
      console.error("Error during sign-up:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <StudentContext.Provider
      value={{ students, signUp, assignFacultySupervisor }}
    >
      {children}
    </StudentContext.Provider>
  );
};
