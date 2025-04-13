import React, { useEffect } from "react";
import { useInternships } from "../context/InternshipContext";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

import InternshipCard from "./InternshipCard";

export const ManageAnnouncement = () => {
  const { fetchUploadedInternships, uploadedInternships, loading } =
    useInternships();
  const { userId, userRole } = useUser();

  useEffect(() => {
    if (userId && userRole === "HR_MANAGER") {
      fetchUploadedInternships(userId);
    }
  }, [userId, userRole, fetchUploadedInternships]);

  // Debugging: Log the uploaded internships
  console.log("Uploaded Internships:", uploadedInternships);

  if (userRole !== "HR_MANAGER") {
    return (
      <p className="text-center text-gray-500">
        Internship management is available for HR managers only.
      </p>
    );
  }
  const navigate = useNavigate();

  if (loading) {
    return (
      <p className="text-center text-gray-500">
        Loading uploaded internships...
      </p>
    );
  }

  return (
    <div className="p-6">
      <h1>Announcement Management</h1>

      <div className="bg-[#F7F5F8] mt-10 p-4 rounded-lg shadow-md h-[80vh] overflow-y-auto scroll-custom space-y-5 ">
        {uploadedInternships?.length > 0 ? (
          uploadedInternships.map((internship) => (
            <InternshipCard
              key={internship.id || internship._id}
              title={internship.title}
              location={internship.location}
              major={internship.majors}
              skills={
                internship.requiredSkills
                  ? internship.requiredSkills.join(", ")
                  : "N/A"
              }
              duration={internship.duration}
              buttonType="edit" // Set button type to "edit"
              extraSpacing
            />
          ))
        ) : (
          <p className="text-center text-gray-500 mb-80">
            No uploaded internships found.
          </p>
        )}
        <div className="flex justify-start ml-80">
          <button
            onClick={() => navigate("/main/addannouncements")}
            className="bg-blue-500 text-white ml-80 px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Add New Announcement
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageAnnouncement;
