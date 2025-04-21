import React, { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";

const InternshipContext = createContext();

export const InternshipProvider = ({ children }) => {
  const [recommendedInternships, setRecommendedInternships] = useState([]);
  const [uploadedInternships, setUploadedInternships] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5;

  const fetchRecommendedInternships = useCallback(
    async (studentId, page = 1) => {
      if (!studentId) return;

      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:8081/api/internships/recommend",
          {
            withCredentials: true,
            params: { studentId, page, limit: itemsPerPage },
          }
        );

        setRecommendedInternships(response.data.internships || []);
        setTotalPages(response.data.totalPages || 1);
      } catch (error) {
        console.error(
          "Error fetching recommended internships:",
          error.response?.data || error
        );
        setRecommendedInternships([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const fetchInternshipById = useCallback(async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8081/api/internships/${id}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching internship details:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchUploadedInternships = useCallback(async (hrManagerId) => {
    if (!hrManagerId) return;

    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:8081/api/internships/uploaded",
        {
          withCredentials: true,
          params: { hrManagerId },
        }
      );

      console.log("API Response:", response.data);
      setUploadedInternships(response.data || []);
    } catch (error) {
      console.error(
        "Error fetching uploaded internships:",
        error.response?.data || error
      );
      setUploadedInternships([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateInternship = useCallback(async (internshipId, formData) => {
    try {
      const response = await axios.put(
        `http://localhost:8081/api/internships/update/${internshipId}`,
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
      console.error(
        "Error updating internship:",
        error.response?.data || error
      );
      throw error;
    }
  }, []);
  const deleteInternship = useCallback(async (internshipId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8081/api/internships/delete/${internshipId}`,
        { withCredentials: true }
      );

      // Optional: Remove deleted internship from the list in state
      setUploadedInternships((prev) =>
        prev.filter((internship) => internship._id !== internshipId)
      );

      return response.data;
    } catch (error) {
      console.error(
        "Error deleting internship:",
        error.response?.data || error
      );
      throw error;
    }
  }, []);
  const createInternship = useCallback(async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:8081/api/internships/create",
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
      console.error(
        "Error creating internship:",
        error.response?.data || error
      );
      throw error;
    }
  }, []);

  return (
    <InternshipContext.Provider
      value={{
        recommendedInternships,
        uploadedInternships,
        loading,
        fetchRecommendedInternships,
        fetchUploadedInternships,
        currentPage,
        setCurrentPage,
        createInternship,
        fetchInternshipById,
        updateInternship,
        deleteInternship,
        totalPages,
      }}
    >
      {children}
    </InternshipContext.Provider>
  );
};

export const useInternships = () => {
  const context = useContext(InternshipContext);
  if (!context) {
    throw new Error("useInternships must be used within an InternshipProvider");
  }
  return context;
};
