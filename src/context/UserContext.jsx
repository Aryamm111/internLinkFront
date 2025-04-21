import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail"));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [userMajor, setUserMajor] = useState(null);
  const [userGpa, setUserGpa] = useState("0.0");
  const [userSkills, setUserSkills] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("userId")
  );

  const registerCompanySupervisor = async (formData, navigate) => {
    try {
      const response = await axios.post(
        "http://localhost:8081/api/companysupervisors/register",
        formData,
        { withCredentials: true }
      );

      alert("Company Supervisor registered successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Error during Company Supervisor registration:", error);
      alert("Registration failed. Please try again.");
    }
  };
  const registerHRManager = async (formData, navigate) => {
    try {
      const res = await axios.post(
        "http://localhost:8081/api/hrmanagers/register",
        formData
      );
      alert(res.data);
      navigate("/login");
    } catch (err) {
      if (err.response && err.response.data) {
        alert(`Error: ${err.response.data}`);
      } else {
        alert("Something went wrong.");
      }
      console.error("Registration failed:", err);
    }
  };

  const fetchUserSession = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/user/session", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        console.error(
          "Session fetch failed:",
          response.status,
          response.statusText
        );
        logout();
        return;
      }

      const data = await response.json();
      console.log("Fetched user session data:", data);

      if (data.userId) {
        setUserId(data.userId);
        setUserName(data.username);
        setUserEmail(data.email);
        setUserRole(data.role);
        setIsAuthenticated(true);

        if (data.userRole === "STUDENT" || data.role == "STUDENT") {
          setUserMajor(data.major);
          console.log(data);
          setUserGpa(data.gpa);
          setUserSkills(data.skills || []);
        }

        // Save to local storage
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("userName", data.username);
        localStorage.setItem("userEmail", data.email);
        localStorage.setItem("userRole", data.role);
      } else {
        console.error("Session response missing userId:", data);
        logout();
      }
    } catch (error) {
      console.error("Error fetching user session:", error);
      logout();
    }
  };

  useEffect(() => {
    fetchUserSession();
  }, []);

  const login = async (email, password, navigate) => {
    try {
      console.log("Attempting to log in with username:", email);

      const payload = { email, password };

      const response = await fetch("http://localhost:8081/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      if (response.ok) {
        console.log("Login successful! Fetching user session...");
        await fetchUserSession();
        navigate("/main");
      } else if (response.status === 401) {
        console.error("Invalid credentials");
        throw new Error("Invalid email or password. Please try again.");
      } else {
        console.error(
          "Unexpected error:",
          response.status,
          response.statusText
        );
        throw new Error(
          "An unexpected error occurred. Please try again later."
        );
      }
    } catch (error) {
      console.error("Error during login:", error.message);

      throw error;
    }
  };

  const logout = async () => {
    try {
      await fetch("http://localhost:8081/api/user/logout", {
        method: "POST",
        credentials: "include",
      });

      setUserId(null);
      setUserName(null);
      setUserEmail(null);
      setUserRole(null);
      setIsAuthenticated(false);

      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userRole");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        userRole,
        userName,
        userEmail,
        userId,
        userMajor,
        userSkills,
        userGpa,
        registerHRManager,
        isAuthenticated,
        login,
        logout,
        registerCompanySupervisor,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
