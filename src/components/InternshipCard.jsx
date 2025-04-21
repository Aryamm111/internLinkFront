import React from "react";
import { useNavigate } from "react-router-dom";
import logoImg from "../assets/Eicon.png";
import progress from "../assets/progress.png";
import connect from "../assets/connect.png";
import { useInternships } from "../context/InternshipContext";

const InternshipCard = ({
  id,
  title,
  company,
  location,
  majors,
  description,
  requiredSkills,
  duration,
  startDate,
  maxStudents,
  imageUrl,
  status,
  isActive, // New prop for active/deleted state
  buttonType = "status",
}) => {
  const navigate = useNavigate();
  const { deleteInternship } = useInternships();

  const displayedImage = imageUrl;

  const handleEditClick = () => {
    if (isActive == "deleted") return; // Prevent editing if not active
    navigate("/main/addannouncements", {
      state: {
        internship: {
          id,
          title,
          company,
          location,
          majors: Array.isArray(majors) ? majors : [majors],
          requiredSkills: Array.isArray(requiredSkills)
            ? requiredSkills
            : requiredSkills.split(",").map((skill) => skill.trim()),
          description,
          duration,
          startDate: startDate || "",
          maxStudents: maxStudents || "",
        },
      },
    });
  };

  const handleDeleteClick = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this internship?"
    );
    if (!confirmDelete) return;

    try {
      await deleteInternship(id);
      alert("Internship deleted successfully.");
    } catch (error) {
      alert("Failed to delete internship. Check console for details.");
    }
  };

  const handleApplyClick = () => {
    if (isActive == "deleted") return; // Prevent applying if not active
    navigate(`/main/internshipDetails/internships/${id}`);
  };

  const getButtonDetails = () => {
    if (isActive == "deleted") {
      return { label: "Deleted", color: "bg-gray-400 cursor-not-allowed" };
    }

    if (buttonType === "status") {
      switch (status) {
        case "accepted":
          return {
            label: "Accepted",
            color: "bg-green-500 hover:bg-green-600",
          };
        case "rejected":
          return { label: "Rejected", color: "bg-red-500 hover:bg-red-600" };
        case "pending":
        default:
          return { label: "Pending", color: "bg-gray-500 hover:bg-gray-600" };
      }
    } else if (buttonType === "action") {
      return { label: "Apply", color: "bg-blue-500 hover:bg-blue-600" };
    } else {
      return null;
    }
  };

  const buttonDetails = getButtonDetails();

  return (
    <div className="w-full pt-2 relative overflow-hidden">
      {isActive == "deleted" && (
        <div className="absolute mt-3 top-0 right-0 bg-red-600 text-white text-xs font-bold px-8 py-2 rounded-bl-lg z-10 shadow-md">
          {" "}
          DELETED
        </div>
      )}

      <div
        className={`flex shadow-lg rounded-xl p-4  overflow-hidden 
        ${
          isActive == "deleted"
            ? "bg-white border border-red-600 border-dashed border-1 "
            : "bg-white border border-grey-100  border-4 "
        }`}
      >
        <img
          src={encodeURI(displayedImage)}
          alt="Internship logo"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = logoImg;
          }}
          className={`w-16 h-16 rounded-lg mr-5 ${
            isActive == "deleted" ? "opacity-70" : ""
          }`}
        />
        <div className="flex-1 mr-10">
          <h1
            className={`text-xl font-bold ${
              isActive == "deleted" ? "text-gray-500" : "text-gray-800"
            }`}
          >
            {title}
          </h1>
          <p
            className={`text-sm ${
              isActive == "deleted" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Location: {location}
          </p>
          <p
            className={`text-sm ${
              isActive == "deleted" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            <span className="font-medium">Majors: </span>
            {Array.isArray(majors) ? majors.join(", ") : majors}
          </p>
          <p
            className={`text-sm ${
              isActive == "deleted" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            <span className="font-medium">Skills: </span>
            {Array.isArray(requiredSkills)
              ? requiredSkills.join(", ")
              : requiredSkills}
          </p>
          <p
            className={`text-sm ${
              isActive == "deleted" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Duration: {duration}
          </p>
        </div>

        <div className="mt-auto flex gap-2">
          {buttonType === "edit" ? (
            <>
              <button
                className={`bg-blue-500 text-white rounded-xl py-2 px-4 
                  ${
                    isActive == "deleted"
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-blue-600"
                  }`}
                onClick={handleEditClick}
                disabled={isActive == "deleted"}
              >
                Edit
              </button>
              <button
                className={`bg-pink-400 text-white rounded-xl py-2 px-4 transition 
                  ${
                    isActive == "deleted"
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:shadow-pink-500/50"
                  }`}
                onClick={handleDeleteClick}
                disabled={isActive == "deleted"}
              >
                Delete
              </button>
            </>
          ) : (
            buttonDetails && (
              <button
                className={`${buttonDetails.color} text-white rounded-xl py-2 px-4`}
                onClick={handleApplyClick}
                disabled={isActive == "deleted"}
              >
                {buttonDetails.label}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default InternshipCard;
