import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useInternships } from "../context/InternshipContext";
import { useUser } from "../context/UserContext";
import { UilMapMarker } from "@iconscout/react-unicons"; // Location icon
import { UilClock } from "@iconscout/react-unicons"; // Time/Watch icon

const InternshipDetail = () => {
  const { id } = useParams(); // Extract the internship ID from the URL
  const { fetchInternshipById, loading } = useInternships(); // Use context method
  const [internship, setInternship] = useState(null);
  const [showForm, setShowForm] = useState(false); // Toggle visibility of the form
  const { userName, userMajor, userGpa, userSkills, userRole } = useUser(); // Include userRole

  useEffect(() => {
    const getInternshipDetails = async () => {
      try {
        const data = await fetchInternshipById(id); // Call context method
        setInternship(data);
      } catch (error) {
        console.error("Error in InternshipDetail component:", error);
      }
    };

    getInternshipDetails();
  }, [id, fetchInternshipById]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!internship) {
    return <div>Internship not found</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        {/* Persistent Header Section */}
        <div className="p-6 text-black rounded-t-lg">
          <h1 className="text-2xl font-bold">{internship.title}</h1>

          {/* Location and Duration Row */}
          <div className="flex items-center text-sm mt-3 text-gray-600">
            <div className="flex items-center mr-4">
              <UilMapMarker className="text-blue-500 mr-1" />
              <span>{internship.location}</span>
            </div>
            <div className="flex items-center">
              <UilClock className="text-blue-500 mr-1" />
              <span>{internship.duration} Hours</span>
            </div>
          </div>

          <hr className="border-gray-300 my-6" />
        </div>

        {/* Toggle-able Section */}
        <div
          className={`p-6 transition-all duration-700 ease-in-out ${
            showForm
              ? "opacity-0 translate-y-8 hidden"
              : "opacity-100 translate-y-0 block"
          }`}
        >
          {/* Description Section */}
          {!showForm && (
            <div>
              <h2 className="text-lg font-semibold">Description:</h2>
              <p className="text-gray-700 mt-2">{internship.description}</p>

              <h2 className="text-lg font-semibold mt-4">Required Skills:</h2>
              <p className="text-gray-700 mt-2">
                {internship.requiredSkills
                  ? internship.requiredSkills.join(", ")
                  : "N/A"}
              </p>

              <div className="mt-6 flex justify-end">
                <button
                  className="px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                  onClick={() => setShowForm(true)} // Show the form
                >
                  Apply Now
                </button>
              </div>
            </div>
          )}
        </div>

        <div
          className={`p-6 transition-all duration-700 ease-in-out ${
            showForm
              ? "opacity-100 translate-y-0 block"
              : "opacity-0 translate-y-8 hidden"
          }`}
        >
          {/* Application Form */}
          {showForm && (
            <div>
              <h2 className="text-lg font-semibold">Application Form</h2>
              <form>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-gray-700 font-semibold">
                      Name:
                    </label>
                    <input
                      type="text"
                      value={userName || ""}
                      disabled
                      className="w-full px-4 py-2 bg-gray-100 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold">
                      Major:
                    </label>
                    <input
                      type="text"
                      value={userMajor || ""}
                      disabled
                      className="w-full px-4 py-2 bg-gray-100 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold">
                      GPA:
                    </label>
                    <input
                      type="text"
                      value={userGpa || ""}
                      disabled
                      className="w-full px-4 py-2 bg-gray-100 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold">
                      Upload Letter (PDF):
                    </label>
                    <input
                      type="file"
                      accept="application/pdf"
                      className="w-full px-4 py-2 bg-white border rounded-lg"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold">
                    Skills:
                  </label>
                  <textarea className="w-full px-4 py-2 bg-white border rounded-lg" />
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InternshipDetail;
