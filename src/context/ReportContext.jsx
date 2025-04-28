import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "./UserContext";

const ReportContext = createContext();
export const useReports = () => useContext(ReportContext);

export const ReportProvider = ({ children }) => {
  const { userId, userRole } = useUser();
  const [reports, setReports] = useState([]);
  const [myReport, setMyReport] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:8081/api/reports/studentreport",
        {
          withCredentials: true,
        }
      );
      const data = Array.isArray(res.data) ? res.data : [res.data];
      setReports(data);
    } catch (err) {
      console.error("Failed to fetch reports", err);
    } finally {
      setLoading(false);
    }
  };

  const uploadMyReport = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:8081/api/reports/upload",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setMyReport(response.data);
    } catch (error) {
      if (error.response.status === 409) {
        throw new Error(
          "You don't have a supervisor yet. You cannot upload a report."
        );
      }
      console.error("Error uploading report:", error);
      throw error;
    }
  };

  const fetchSupervisorReports = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:8081/api/reports/supervisor",
        { withCredentials: true }
      );
      setReports(response.data);
    } catch (error) {
      console.error("Error fetching reports:", error);
    } finally {
      setLoading(false);
    }
  };

  const verifyReport = async (reportId) => {
    try {
      await axios.put(
        `http://localhost:8081/api/reports/${reportId}/verify`,
        {},
        { withCredentials: true }
      );
      setReports((prev) =>
        prev.map((r) => (r.id === reportId ? { ...r, verified: true } : r))
      );
    } catch (error) {
      console.error("Error verifying report:", error);
      throw error;
    }
  };

  return (
    <ReportContext.Provider
      value={{
        myReport,
        reports,
        loading,
        fetchReports,
        uploadMyReport,
        fetchSupervisorReports,
        verifyReport,
      }}
    >
      {children}
    </ReportContext.Provider>
  );
};
