import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail"));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("userId")
  );

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

  const handleSignUp = async (formData, skills, navigate) => {
    try {
      const endpoint =
        formData.userType === "Student"
          ? "http://localhost:8081/api/students/register"
          : "http://localhost:8081/register";

      const payload =
        formData.userType === "Student"
          ? { ...formData, skills }
          : { ...formData };

      const response = await axios.post(endpoint, payload, {
        withCredentials: true,
      });

      alert(response.data);
      navigate("/login");
    } catch (error) {
      console.error("Error during sign-up:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <UserContext.Provider
      value={{
        userRole,
        userName,
        userEmail,
        userId,
        isAuthenticated,
        login,
        logout,
        handleSignUp,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
