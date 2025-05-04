import React, { useEffect, useState } from "react";
import { useInternships } from "../context/InternshipContext";
import { useUser } from "../context/UserContext";
import InternshipCard from "./InternshipCard";
import axios from "axios";
import { UilFilter, UilSearch } from "@iconscout/react-unicons";

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
  const [selectedLocation, setSelectedLocation] = useState("");
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
        size: 15,
        ...(searchTerm && { title: encodeURIComponent(searchTerm) }),
        ...(selectedLocation && {
          location: encodeURIComponent(selectedLocation),
        }),
      };

      const response = await axios.get(url, {
        params,
        withCredentials: true,
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setSearchLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm || selectedLocation) {
      fetchSearchResults();
    } else {
      setSearchResults(null);
    }
  }, [searchTerm, selectedLocation, currentPage]);

  if (userRole !== "STUDENT") {
    return (
      <div className="bg-gray-50 rounded-xl p-8 text-center">
        <p className="text-gray-600">
          Internship recommendations are available for students only.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto flex flex-col h-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          {searchResults !== null
            ? "Search Results"
            : "Recommended Internships"}
        </h1>
        <div className="flex justify-center bg-gray-50 items-center h-64 mb-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
        </div>
      </div>
    );
  }

  const internshipsToDisplay =
    searchResults !== null ? searchResults : recommendedInternships;

  return (
    <div className="p-6 max-w-7xl mx-auto flex flex-col h-full">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        {searchResults !== null ? "Search Results" : "Recommended Internships"}
      </h1>

      {/* Search and Filter */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="relative flex-1 min-w-[250px]">
          <UilSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search internships..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="relative min-w-[200px]">
          <UilFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <select
            className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            <option value="">All Locations</option>
            <option value="Medina">Medina</option>
            <option value="Ula">Ula</option>
            <option value="Yanbu">Yanbu</option>
            <option value="Khaibar">Khaibar</option>
            <option value="Badr">Badr</option>
          </select>
        </div>
      </div>

      {/* Internships List */}
      <div className="flex-1 overflow-hidden">
        <div className="h-[65vh] pr-2 overflow-y-auto scroll-custom bg-gray-50 rounded-lg p-4">
          {searchLoading ? (
            <div className="flex justify-center items-center h-full">
              <p className="text-gray-600">Searching...</p>
            </div>
          ) : internshipsToDisplay.length > 0 ? (
            <div className="space-y-4">
              {internshipsToDisplay.map((internship, index) => (
                <InternshipCard
                  key={internship.id || internship._id}
                  id={internship.id}
                  title={internship.title}
                  location={internship.location}
                  majors={internship.majors}
                  imageUrl={internship.imageUrl}
                  requiredSkills={
                    internship.requiredSkills
                      ? internship.requiredSkills.join(", ")
                      : "N/A"
                  }
                  duration={internship.duration}
                  buttonType="action"
                  extraSpacing
                />
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center h-full">
              <p className="text-gray-600">No internships found.</p>
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg ${
            currentPage === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white text-blue-600 hover:bg-blue-50"
          }`}
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage >= totalPages}
          className={`px-4 py-2 rounded-lg ${
            currentPage >= totalPages
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white text-blue-600 hover:bg-blue-50"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default InternshipList;
