import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("userId"));

  // Function to fetch user session from backend
  const fetchUserSession = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/user/session", {
        method: "GET",
        credentials: "include", 
      });

      if (!response.ok) {
        console.error("Session fetch failed:", response.status, response.statusText);
        logout();
        return;
      }

      const data = await response.json();
      console.log("Fetched user session data:", data);

      if (data.userId) {
        setUserId(data.userId);
        setUserName(data.username);
        setUserRole(data.role);
        setIsAuthenticated(true);


        localStorage.setItem("userId", data.userId);
        localStorage.setItem("userName", data.username);
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

  const login = async (username, password, navigate) => {
    try {
      console.log("Attempting to log in with username:", username);

      const payload = { username, password };

      const response = await fetch("http://localhost:8081/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include", 
      });

      if (response.ok) {
        console.log("Login successful! Fetching user session...");
        await fetchUserSession(); 
        navigate("/home");
      } else {
        console.error("Login failed:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error during login:", error);
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
      setUserRole(null);
      setIsAuthenticated(false);

     
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
      localStorage.removeItem("userRole");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <UserContext.Provider value={{ userRole, userName, userId, isAuthenticated, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
