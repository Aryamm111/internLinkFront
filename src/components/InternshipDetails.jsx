import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useInternships } from "../context/InternshipContext";
import { useUser } from "../context/UserContext";
import { UilMapMarker } from "@iconscout/react-unicons"; // Location icon
import { UilClock } from "@iconscout/react-unicons"; // Time/Watch icon
import { useApplication } from "../context/ApplicationContext";

const InternshipDetail = () => {
  const { id } = useParams(); // Extract the internship ID from the URL
  const { fetchInternshipById, loading } = useInternships(); // Use context method
  const [file, setFile] = useState(null); // To store the uploaded file
  const [internship, setInternship] = useState(null);
  const [skills, setSkills] = useState("");
  const [academicRecord, setAcademicRecord] = useState(null); // State for academic record
  const [cv, setCv] = useState(null);

  const [showForm, setShowForm] = useState(false); // Toggle visibility of the form
  const { userName, userMajor, userGpa, userSkills, userRole } = useUser(); // Include userRole
  const [applying, setApplying] = useState(false);
  const { applyForInternship } = useApplication();
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const handleAcademicRecordChange = (event) => {
    setAcademicRecord(event.target.files[0]);
  };

  const handleCvChange = (event) => {
    setCv(event.target.files[0]);
  };

  const handleApplyClick = async () => {
    if (!file) {
      alert("Please upload your application letter (PDF).");
      return;
    }
    if (!academicRecord) {
      alert("Please upload your academic record (PDF).");
      return;
    }
    if (!cv) {
      alert("Please upload your CV (PDF).");
      return;
    }

    try {
      setApplying(true);
      const response = await applyForInternship(
        internship.id,
        userName, // or userId
        internship.title,
        file,
        academicRecord, // Include academicRecord
        cv, // Include CV
        skills
      );
      alert(response);
    } catch (error) {
      alert("Application failed. Please try again.");
    } finally {
      setApplying(false);
    }
  };

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
    <div className="mt-10">
      <h1>Internship Details</h1>
      <div className="p-6 bg-gray-50  min-h-screen">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Header Section with Image */}
          <div className="relative">
            <div className="p-3 text-indigo-900 flex items-center">
              <div className="mr-4">
                <img
                  src={internship.imageUrl}
                  alt={internship.title}
                  className="w-16 h-16 rounded-full object-cover"
                />
              </div>
              <h2 className="text-2xl font-bold">{internship.title}</h2>
            </div>
          </div>

          {/* Persistent Header Section */}
          <div className=" text-indigo-900">
            {/* Location and Duration Row */}
            <div className="flex items-center text-sm ml-20 ">
              <div className="flex items-center mr-4">
                <UilMapMarker className="text-pink-300 mr-1" />
                <span>{internship.location}</span>
              </div>
              <div className="flex items-center">
                <UilClock className="text-pink-300 mr-1" />
                <span>{internship.duration} Hours</span>
              </div>
            </div>

            <hr className="border-indigo-300 my-6 shadow-xl" />
          </div>

          {/* Description Section */}
          <div
            className={`p-6 transition-all duration-700 ease-in-out ${
              showForm
                ? "opacity-0 translate-y-8 hidden"
                : "opacity-100 translate-y-0 block"
            }`}
          >
            {!showForm && (
              <div className="bg-indigo-50 p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold">Description:</h2>
                <p className=" mt-2">{internship.description}</p>

                <h2 className="text-xl font-semibold mt-4">Required Skills:</h2>
                <p className=" mt-2">
                  {internship.requiredSkills
                    ? internship.requiredSkills.join(", ")
                    : "N/A"}
                </p>
                {internship.internshipPlanUrl && (
                  <div className="mt-4 p-4 bg-white border-l-4 border-indigo-500 rounded-lg">
                    <h2 className="text-lg font-semibold ">Internship Plan:</h2>
                    <a
                      href={internship.internshipPlanUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-300 underline"
                    >
                      View Plan Document
                    </a>
                  </div>
                )}

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
              <div className="p-6 rounded-lg border border-pink-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Application Form
                </h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleApplyClick();
                  }}
                >
                  <div className="space-y-6">
                    {/* Name and Major */}
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Name
                        </label>
                        <input
                          type="text"
                          value={userName || ""}
                          disabled
                          className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-800"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Major
                        </label>
                        <input
                          type="text"
                          value={userMajor || ""}
                          disabled
                          className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-800"
                        />
                      </div>
                    </div>

                    {/* GPA */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        GPA
                      </label>
                      <input
                        type="text"
                        value={userGpa || ""}
                        disabled
                        className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-800"
                      />
                    </div>

                    {/* File Uploads */}
                    <div className="grid grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Upload Letter (PDF)
                        </label>
                        <input
                          type="file"
                          accept="application/pdf"
                          onChange={handleFileChange}
                          className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-800"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Upload Academic Record (PDF)
                        </label>
                        <input
                          type="file"
                          accept="application/pdf"
                          onChange={handleAcademicRecordChange}
                          className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-800"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Upload CV (PDF)
                        </label>
                        <input
                          type="file"
                          accept="application/pdf"
                          onChange={handleCvChange}
                          className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-800"
                        />
                      </div>
                    </div>

                    {/* Skills */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Skills
                      </label>
                      <textarea
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                        className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-800"
                        placeholder="Enter your skills..."
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="text-right">
                      <button
                        type="submit"
                        className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
                      >
                        Submit Application
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternshipDetail;
