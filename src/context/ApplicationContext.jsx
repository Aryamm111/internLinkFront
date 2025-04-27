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
  }, [setLoading, setApplications]);

  const applyForInternship = async (
    internshipId,
    studentId,
    internshipTitle,
    applicationLetter,
    academicRecord,
    cv,
    skills
  ) => {
    try {
      const formData = new FormData();
      formData.append("studentId", studentId);
      formData.append("internshipTitle", internshipTitle);
      formData.append("applicationLetter", applicationLetter);
      formData.append("academicRecord", academicRecord);
      formData.append("cv", cv); // Add cv
      formData.append("skills", skills);

      const response = await axios.post(
        `http://localhost:8081/api/applications/${internshipId}/apply`,
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

  const fetchApplicantsForInternship = useCallback(async (internshipId) => {
    try {
      const response = await axios.get(
        `http://localhost:8081/api/applications/${internshipId}/applicants`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching applicants:", error);
      return [];
    }
  }, []);

  const updateApplicationStatus = async (applicationId, status) => {
    try {
      const response = await axios.post(
        `http://localhost:8081/api/applications/${applicationId}/updatestatus?status=${status}`,
        {},
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating status:", error);
      throw error;
    }
  };

  const fetchAcceptedStudents = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:8081/api/applications/accepted-students",
        { withCredentials: true }
      );
      return response.data; // Return the data so the component can use it
    } catch (error) {
      console.error("Error fetching accepted students:", error);
      return []; // Always return something
    } finally {
      setLoading(false);
    }
  }, []);
  return (
    <ApplicationContext.Provider
      value={{
        applications,
        fetchStudentApplications,
        loading,
        applyForInternship,
        fetchApplicantsForInternship,
        updateApplicationStatus,
        fetchAcceptedStudents,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplication = () => useContext(ApplicationContext);
