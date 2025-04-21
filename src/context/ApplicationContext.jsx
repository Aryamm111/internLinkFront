import React, { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";

const ApplicationContext = createContext();

export const ApplicationProvider = ({ children }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchStudentApplications = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8081/api/applications/student`,
        {
          withCredentials: true,
        }
      );
      setApplications(response.data);
    } catch (error) {
      console.error("Error fetching student applications:", error);
    } finally {
      setLoading(false);
    }
  }, [setLoading, setApplications]); // Dependencies for stable function

  const applyForInternship = async (
    internshipId,
    studentId,
    internshipTitle,
    applicationLetter,
    academicRecord, // Add academicRecord
    cv, // Add cv
    skills
  ) => {
    try {
      // Create FormData to handle file uploads
      const formData = new FormData();
      formData.append("studentId", studentId);
      formData.append("internshipTitle", internshipTitle);
      formData.append("applicationLetter", applicationLetter);
      formData.append("academicRecord", academicRecord); // Add academicRecord
      formData.append("cv", cv); // Add cv
      formData.append("skills", skills);

      // Send POST request
      const response = await axios.post(
        `http://localhost:8081/api/applications/${internshipId}/apply`, // Backend URL
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error applying for internship:", error);
      throw error;
    }
  };

  return (
    <ApplicationContext.Provider
      value={{
        applications,
        fetchStudentApplications,
        loading,
        applyForInternship,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplication = () => useContext(ApplicationContext);
