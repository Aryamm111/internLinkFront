import React, { useEffect, useState } from "react";
import Table from "./Table";
import { useApplication } from "../context/ApplicationContext";
import { useInternships } from "../context/InternshipContext";
import { useUser } from "../context/UserContext";

const ViewApplicants = () => {
  const { userId } = useUser();
  const { fetchApplicantsForInternship, updateApplicationStatus } =
    useApplication();
  const { uploadedInternships, fetchUploadedInternships } = useInternships();

  const [selectedInternshipId, setSelectedInternshipId] = useState("");
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userId) {
      fetchUploadedInternships(userId);
    }
  }, [userId, fetchUploadedInternships]);

  useEffect(() => {
    const loadApplicants = async () => {
      if (selectedInternshipId) {
        setLoading(true);
        const result = await fetchApplicantsForInternship(selectedInternshipId);
        setApplicants(result);
        setLoading(false);
      }
    };
    loadApplicants();
  }, [selectedInternshipId, fetchApplicantsForInternship]);

  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      await updateApplicationStatus(applicationId, newStatus);
      // Update local state after successful status update
      setApplicants((prev) =>
        prev.map((app) =>
          app.id === applicationId ? { ...app, status: newStatus } : app
        )
      );
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const applicantColumns = [
    { key: "studentId", header: "Student ID" },
    {
      key: "appliedOn",
      header: "Applied On",
      render: (value) => new Date(value).toLocaleDateString(),
    },
    {
      key: "letter",
      header: "Letter",
      render: (value) =>
        value ? (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1 rounded-full hover:bg-blue-200 transition"
          >
            View
          </a>
        ) : (
          "N/A"
        ),
    },
    {
      key: "academicRecord",
      header: "Academic Record",
      render: (value) =>
        value ? (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 rounded-full hover:bg-green-200 transition"
          >
            View
          </a>
        ) : (
          "N/A"
        ),
    },
    {
      key: "cv",
      header: "CV",
      render: (value) =>
        value ? (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-yellow-100 text-yellow-700 text-sm font-semibold px-3 py-1 rounded-full hover:bg-yellow-200 transition"
          >
            View
          </a>
        ) : (
          "N/A"
        ),
    },
    {
      key: "skills",
      header: "Skills",
      render: (value) => value || "N/A",
    },
    {
      key: "status",
      header: "Status",
      render: (_, row) => (
        <select
          value={row.status}
          onChange={(e) => handleStatusChange(row.id, e.target.value)}
          className="p-1 border rounded bg-white text-sm"
        >
          <option value="Pending">Pending</option>
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option>
        </select>
      ),
    },
  ];

  return (
    <div className="p-8">
      <h1 className="mb-6">View Applicants</h1>

      <div className="mb-6">
        <label
          htmlFor="internshipSelect"
          className="block text-lg font-medium mb-2"
        >
          Select Internship
        </label>
        <select
          id="internshipSelect"
          value={selectedInternshipId}
          onChange={(e) => setSelectedInternshipId(e.target.value)}
          className="w-full md:w-96 bg-white  p-2 border border-gray-300 rounded-md shadow-sm"
        >
          <option value="">-- Select --</option>
          {uploadedInternships.map((internship) => (
            <option key={internship.id} value={internship.id}>
              {internship.title}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="min-h-[200px] flex items-center justify-center text-gray-500">
          Loading applicants...
        </div>
      ) : applicants.length === 0 && selectedInternshipId ? (
        <div className="min-h-[200px] flex items-center justify-center text-gray-500">
          No applicants found.
        </div>
      ) : applicants.length > 0 ? (
        <div className="p-4 bg-[#F5F5F5] rounded-lg mb-20">
          <Table
            columns={applicantColumns}
            data={applicants}
            showAddButton={false}
          />
        </div>
      ) : null}
    </div>
  );
};

export default ViewApplicants;
