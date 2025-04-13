import React from "react";
import { useNavigate } from "react-router-dom";
import logoImg from "../assets/Eicon.png";
import progress from "../assets/progress.png";
import connect from "../assets/connect.png";

// Fallback image options
const imageOptions = [logoImg, progress, connect];

const InternshipCard = ({
  id,
  title,
  location,
  major,
  skills,
  duration,
  image,
  status,
  buttonType = "status",
  onDelete,
}) => {
  const navigate = useNavigate();

  const displayedImage =
    image || imageOptions[Math.floor(Math.random() * imageOptions.length)];

  const handleEditClick = () => {
    navigate("/main/addannouncements", {
      state: { opportunity: { title, location, major, skills, duration } },
    });
  };
  const handleApplyClick = () => {
    navigate(`/main/internshipDetails/internships/${id}`); // Redirect to the internship detail page
  };

  const getButtonDetails = () => {
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
    <div className="w-full pt-2">
      <div className="flex bg-white shadow-lg rounded-xl p-4 border-4 border-opacity-25">
        <img
          src={displayedImage}
          alt="Internship logo"
          className="w-16 h-16 rounded-lg mr-5"
        />
        <div className="flex-1 mr-10">
          <h1 className="text-xl font-bold text-gray-800">{title}</h1>
          <p className="text-sm text-gray-600">Location: {location}</p>
          <p className="text-sm text-gray-600">Major: {major}</p>
          <p className="text-sm text-gray-600">Skills: {skills}</p>
          <p className="text-sm text-gray-600">Duration: {duration}</p>
        </div>

        <div className="mt-auto flex gap-2">
          {buttonType === "edit" ? (
            <>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl py-2 px-4"
                onClick={handleEditClick}
              >
                Edit
              </button>
              <button
                className="bg-pink-400 hover:shadow-pink-500/50 text-white rounded-xl py-2 px-4 transition"
                onClick={onDelete}
              >
                Delete
              </button>
            </>
          ) : (
            buttonDetails && (
              <button
                className={`${buttonDetails.color} text-white rounded-xl py-2 px-4`}
                onClick={handleApplyClick}
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
