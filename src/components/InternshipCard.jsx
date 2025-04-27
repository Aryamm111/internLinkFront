import React from "react";
import { useNavigate } from "react-router-dom";
import logoImg from "../assets/Eicon.png";
import { useInternships } from "../context/InternshipContext";
import {
  UilEdit,
  UilTrashAlt,
  UilCheckCircle,
  UilTimesCircle,
  UilMapMarker,
  UilBookAlt,
  UilCodeBranch,
  UilCalendarAlt,
  UilClock,
} from "@iconscout/react-unicons";

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
  isActive,
  buttonType = "status",
}) => {
  const navigate = useNavigate();
  const { deleteInternship } = useInternships();

  const displayedImage = imageUrl;

  const handleEditClick = () => {
    if (isActive == "deleted") return;
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
    if (isActive == "deleted") return;
    navigate(`/main/internshipDetails/internships/${id}`);
  };

  const getButtonDetails = () => {
    if (isActive == "deleted") {
      return {
        label: "Deleted",
        color: "bg-gray-300 text-gray-600",
        icon: <UilTimesCircle className="mr-1" size="16" />,
      };
    }

    if (buttonType === "status") {
      switch (status) {
        case "accepted":
          return {
            label: "Accepted",
            color: "bg-green-100 text-green-800",
            icon: <UilCheckCircle className="mr-1" size="16" />,
          };
        case "rejected":
          return {
            label: "Rejected",
            color: "bg-red-100 text-red-800",
            icon: <UilTimesCircle className="mr-1" size="16" />,
          };
        case "pending":
        default:
          return {
            label: "Pending",
            color: "bg-blue-100 text-blue-800",
            icon: <UilClock className="mr-1" size="16" />,
          };
      }
    } else if (buttonType === "action") {
      return {
        label: "View Details",
        color: "bg-blue-500 hover:bg-blue-600 text-white",
        icon: null,
      };
    } else {
      return null;
    }
  };

  const buttonDetails = getButtonDetails();

  return (
    <div className="w-full mb-4 relative group">
      {isActive == "deleted" && (
        <div className="absolute top-3 right-3 bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-md z-10">
          Archived
        </div>
      )}

      <div
        className={`flex flex-col sm:flex-row p-5 rounded-xl bg-white border border-gray-100 shadow-xs hover:shadow-sm transition-all ${
          isActive == "deleted" ? "opacity-80" : "group-hover:border-blue-100"
        }`}
      >
        {/* Image */}
        <div className="flex-shrink-0 mb-3 sm:mb-0 sm:mr-4">
          <div className="w-14 h-14 rounded-lg bg-blue-50 flex items-center justify-center overflow-hidden">
            <img
              src={encodeURI(displayedImage)}
              alt="Internship logo"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = logoImg;
              }}
              className={`w-full h-full object-contain p-1 ${
                isActive == "deleted" ? "opacity-60" : ""
              }`}
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h2
            className={`text-lg font-semibold mb-2 ${
              isActive == "deleted" ? "text-gray-500" : "text-gray-800"
            }`}
          >
            {title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 text-sm">
            <div className="flex items-start">
              <UilMapMarker
                className="mt-0.5 mr-1.5 text-blue-400 flex-shrink-0"
                size="16"
              />
              <span
                className={
                  isActive == "deleted" ? "text-gray-400" : "text-gray-600"
                }
              >
                {location}
              </span>
            </div>

            <div className="flex items-start">
              <UilBookAlt
                className="mt-0.5 mr-1.5 text-blue-400 flex-shrink-0"
                size="16"
              />
              <span
                className={
                  isActive == "deleted" ? "text-gray-400" : "text-gray-600"
                }
              >
                {Array.isArray(majors) ? majors.join(", ") : majors}
              </span>
            </div>

            <div className="flex items-start">
              <UilCodeBranch
                className="mt-0.5 mr-1.5 text-blue-400 flex-shrink-0"
                size="16"
              />
              <span
                className={
                  isActive == "deleted" ? "text-gray-400" : "text-gray-600"
                }
              >
                {Array.isArray(requiredSkills)
                  ? requiredSkills.join(", ")
                  : requiredSkills}
              </span>
            </div>

            <div className="flex items-start">
              <UilCalendarAlt
                className="mt-0.5 mr-1.5 text-blue-400 flex-shrink-0"
                size="16"
              />
              <span
                className={
                  isActive == "deleted" ? "text-gray-400" : "text-gray-600"
                }
              >
                {duration}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-3 sm:mt-0 sm:ml-4 flex sm:flex-col justify-end sm:justify-between items-end">
          {buttonType === "edit" ? (
            <div className="flex space-x-2">
              <button
                onClick={handleEditClick}
                disabled={isActive == "deleted"}
                className={`flex items-center px-3 py-1.5 rounded-lg text-sm ${
                  isActive == "deleted"
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                }`}
              >
                <UilEdit className="mr-1" size="14" />
                Edit
              </button>
              <button
                onClick={handleDeleteClick}
                disabled={isActive == "deleted"}
                className={`flex items-center px-3 py-1.5 rounded-lg text-sm ${
                  isActive == "deleted"
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-red-50 text-red-600 hover:bg-red-100"
                }`}
              >
                <UilTrashAlt className="mr-1" size="14" />
                Delete
              </button>
            </div>
          ) : (
            buttonDetails && (
              <button
                onClick={handleApplyClick}
                disabled={isActive == "deleted"}
                className={`flex items-center px-3 py-1.5 rounded-lg text-sm border ${
                  buttonDetails.color
                } ${
                  isActive == "deleted"
                    ? "cursor-not-allowed"
                    : "hover:shadow-xs"
                }`}
              >
                {buttonDetails.icon}
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
