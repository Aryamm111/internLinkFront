import React, { useEffect, useState } from "react";
import Table from "./Table";
import { useApplication } from "../context/ApplicationContext";

const applicationColumns = [
  { key: "internshipTitle", header: "Internship Title" },
  { key: "status", header: "Status" },
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
];

const ApplicationsTableWrapper = () => {
  const { applications, fetchStudentApplications, loading } = useApplication();

  useEffect(() => {
    fetchStudentApplications();
  }, [fetchStudentApplications]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        No applications found.
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold mb-6">My Applications</h1>
      <div className=" p-4 mb-20 w-full bg-[#F5F5F5] rounded-lg">
        <Table
          columns={applicationColumns}
          data={applications}
          showAddButton={false} // No "Add" button for this table
        />
      </div>
    </div>
  );
};

export default ApplicationsTableWrapper;
