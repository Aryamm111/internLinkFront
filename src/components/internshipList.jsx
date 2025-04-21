import React, { useEffect, useState } from "react";
import { useInternships } from "../context/InternshipContext";
import { useUser } from "../context/UserContext";
import InternshipCard from "./InternshipCard";
import axios from "axios";
import { UilFilter } from "@iconscout/react-unicons"; 
const InternshipList = () => {
  const {
    recommendedInternships,
    loading,
    fetchRecommendedInternships,
    currentPage,
    setCurrentPage,
    totalPages,
  } = useInternships();

  const { userId, userRole } = useUser();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMajor, setSelectedMajor] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    if (userId && userRole === "STUDENT") {
      fetchRecommendedInternships(userId, currentPage);
    }
  }, [userId, userRole, currentPage]);

  const fetchSearchResults = async () => {
    setSearchLoading(true);
    try {
      const url = `http://localhost:8081/api/internships/search`;

      const params = {
        page: currentPage,
        size: 10,
        ...(searchTerm && { title: encodeURIComponent(searchTerm) }),
        ...(selectedMajor && { major: encodeURIComponent(selectedMajor) }),
      };

      const response = await axios.get(url, {
        params,
        withCredentials: true,
      });

      const data = response.data;
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setSearchLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm || selectedMajor) {
      fetchSearchResults();
    } else {
      setSearchResults(null);
    }
  }, [searchTerm, selectedMajor, currentPage]);

  if (userRole !== "STUDENT") {
    return (
      <p className="text-center text-gray-500">
        Internship recommendations are available for students only.
      </p>
    );
  }

  if (loading) {
    return (
      <p className="text-center text-gray-500">
        Loading recommended internships...
      </p>
    );
  }

  const internshipsToDisplay =
    searchResults !== null ? searchResults : recommendedInternships;

  return (
    <div className="p-6">
      <h1 className="mb-4">
        {searchResults !== null ? "Search Results" : "Recommended Internships"}
      </h1>

      <div className="bg-[#F5F5F5] rounded-lg shadow-md p-4 h-[80vh] overflow-y-auto scroll-custom">
        <div className="flex justify-between items-center gap-4 mb-4">
          <input
            type="text"
            placeholder="Search internships..."
            className="w-full max-w-md p-2 border rounded-lg bg-white shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="relative flex items-center">
            <UilFilter
              className="absolute left-3 text-gray-500 pointer-events-none "
              size="24"
            />

            <select
              className="w-full pl-10 p-2 border rounded-lg bg-white shadow-sm"
              value={selectedMajor}
              onChange={(e) => setSelectedMajor(e.target.value)}
            >
              <option value="">Filter</option>
              {[
                ...new Set(
                  recommendedInternships.flatMap(
                    (internship) => internship.majors
                  )
                ),
              ].map((major) => (
                <option key={major} value={major}>
                  {major}
                </option>
              ))}
            </select>
          </div>
        </div>
        {searchLoading ? (
          <p className="text-center text-gray-500">Searching...</p>
        ) : internshipsToDisplay.length > 0 ? (
          internshipsToDisplay.map((internship) => (
            <InternshipCard
              key={internship.id || internship._id}
              id={internship.id}
              title={internship.title}
              location={internship.location}
              major={internship.majors}
              skills={
                internship.requiredSkills
                  ? internship.requiredSkills.join(", ")
                  : "N/A"
              }
              duration={internship.duration}
              buttonType="action"
              extraSpacing
            />
          ))
        ) : (
          <p className="text-center text-gray-500">No internships found.</p>
        )}
      </div>

      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 border ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed"
              : "text-blue-600"
          } rounded-md`}
        >
          Previous
        </button>
        <p className="text-gray-700">
          Page {currentPage} of {totalPages}
        </p>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage >= totalPages}
          className={`px-4 py-2 border ${
            currentPage >= totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "text-blue-600"
          } rounded-md`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default InternshipList;
