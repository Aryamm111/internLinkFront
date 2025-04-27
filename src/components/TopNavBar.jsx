import React from "react";
import { useUser } from "../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import { UilSignout, UilUserCircle } from "@iconscout/react-unicons";

const TopNavBar = () => {
  const { userName, userEmail, logout, userRole } = useUser(); // Assuming userRole is available in your UserContext
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleProfileClick = () => {
    if (userRole === "STUDENT") {
      navigate("update-profile");
    }
  };

  // Determine cursor style based on user role
  const profileCursorStyle =
    userRole === "STUDENT" ? "cursor-pointer" : "cursor-default";

  return (
    <header className="bg-white shadow-sm p-4 border-b border-gray-100 w-full fixed top-0 z-10">
      <div className="flex justify-between items-center">
        <div
          className={`flex items-center space-x-3 ${profileCursorStyle} group`}
          onClick={handleProfileClick}
        >
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-300 to-purple-400 flex items-center justify-center text-white font-medium group-hover:opacity-80 transition-opacity">
              {userName?.charAt(0).toUpperCase() || "U"}
            </div>
            {userRole === "STUDENT" && (
              <UilUserCircle
                className="absolute -bottom-1 -right-1 bg-white rounded-full text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"
                size="16"
              />
            )}
          </div>
          <div className="flex flex-col">
            <span
              className={`text-gray-800 text-sm font-medium ${
                userRole === "STUDENT" ? "group-hover:text-purple-600" : ""
              } transition-colors`}
            >
              {userName}
            </span>
            <span className="text-gray-400 text-xs">{userEmail}</span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="fixed right-5 top-3 z-50 p-2 text-gray-500 hover:text-pink-500 rounded-full hover:bg-pink-100 transition-all duration-200"
          aria-label="Logout"
        >
          <UilSignout
            size="22"
            className="hover:scale-105 transition-transform"
          />
        </button>
      </div>
    </header>
  );
};

export default TopNavBar;
