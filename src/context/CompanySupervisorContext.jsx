import React, { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";

const CompanySupervisorContext = createContext();

export const useCompanySupervisors = () => useContext(CompanySupervisorContext);

export const CompanySupervisorProvider = ({ children }) => {
  const [supervisors, setSupervisors] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSupervisors = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:8081/api/companysupervisors/list",
        { withCredentials: true }
      );
      setSupervisors(response.data);
    } catch (error) {
      console.error("Error fetching supervisors:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <CompanySupervisorContext.Provider
      value={{
        supervisors,
        loading,
        fetchSupervisors,
      }}
    >
      {children}
    </CompanySupervisorContext.Provider>
  );
};
