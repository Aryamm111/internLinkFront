import React, { useEffect, useState } from "react";
import { useReports } from "../context/ReportContext";
import { useUser } from "../context/UserContext";
import {
  UilCheckCircle,
  UilExclamationTriangle,
  UilFileAlt,
  UilEye,
  UilCheck,
  UilSort,
  UilSortAmountDown,
  UilSortAmountUp,
} from "@iconscout/react-unicons";

export const ReportsPage = () => {
  const { userRole } = useUser();
  const { reports, fetchReports, fetchSupervisorReports, verifyReport } =
    useReports();
  const [sortOrder, setSortOrder] = useState("newest");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    if (userRole === "student") {
      fetchReports();
    } else {
      fetchSupervisorReports();
    }
  }, [userRole]);

  const handleVerify = async (reportId) => {
    try {
      await verifyReport(reportId);
    } catch (error) {
      console.error("Verification failed:", error);
    }
  };

  const sortedAndFilteredReports = [...reports]
    .filter((report) => {
      if (filterStatus === "all") return true;
      if (filterStatus === "verified") return report.verified;
      if (filterStatus === "pending") return !report.verified;
      return true;
    })
    .sort((a, b) => {
      if (sortOrder === "newest") {
        return new Date(b.submissionDate) - new Date(a.submissionDate);
      } else if (sortOrder === "oldest") {
        return new Date(a.submissionDate) - new Date(b.submissionDate);
      }
      return 0;
    });

  return (
    <div className="p-6 max-w-4xl mx-auto h-full flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Reports</h1>

        {/* Filters Section */}
        <div className="flex flex-wrap gap-4 mt-4">
          <div className="flex items-center space-x-2 bg-white p-2 rounded-lg shadow-sm">
            <UilSort className="text-gray-500" />
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="bg-transparent text-sm focus:outline-none"
            >
              <option value="default">Default Order</option>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>

          <div className="flex items-center space-x-2 bg-white p-2 rounded-lg shadow-sm">
            <UilCheckCircle className="text-gray-500" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-transparent text-sm focus:outline-none"
            >
              <option value="all">All Reports</option>
              <option value="verified">Verified Only</option>
              <option value="pending">Pending Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Scrollable Reports Container */}
      <div className="flex-1 overflow-hidden">
        <div className="h-[80vh] pr-2 overflow-y-auto scroll-custom bg-gray-50 p-5">
          {sortedAndFilteredReports.length === 0 ? (
            <div className="bg-gray-50 rounded-xl p-8 text-center h-full flex items-center justify-center">
              <p className="text-gray-600 text-lg">
                {filterStatus === "all"
                  ? "No reports found."
                  : `No ${filterStatus} reports found.`}
              </p>
            </div>
          ) : (
            <div className="space-y-4 pb-2">
              {sortedAndFilteredReports.map((report, index) => (
                <div
                  key={report.id}
                  className={`rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg ${
                    index % 2 === 0
                      ? "bg-gradient-to-br from-pink-50 to-blue-50 border-l-4 border-pink-400"
                      : "bg-gradient-to-br from-indigo-50 to-blue-50 border-l-4 border-indigo-400"
                  }`}
                >
                  <div className="p-5 flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex items-start space-x-4 mb-4 md:mb-0">
                      <div className="text-indigo-500 text-2xl mt-1">
                        <UilFileAlt />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-gray-500">
                            Report #{index + 1}
                          </span>
                          <h3 className="font-semibold text-gray-800">
                            {report.studentName || "Unknown Student"}
                          </h3>
                          {report.verified ? (
                            <UilCheckCircle
                              className="text-green-600 text-lg"
                              title="Verified"
                            />
                          ) : (
                            <UilExclamationTriangle
                              className="text-yellow-500 text-lg"
                              title="Pending"
                            />
                          )}
                        </div>
                        <p className="text-sm text-gray-600">
                          Submitted:{" "}
                          {new Date(report.submissionDate).toLocaleDateString()}
                        </p>
                        <span
                          className={`inline-block mt-1 text-xs px-2 py-1 rounded-full ${
                            report.verified
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {report.verified
                            ? "Verified"
                            : "Pending Verification"}
                        </span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        className="flex items-center space-x-1 px-3 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
                        onClick={() => window.open(report.fileUrl, "_blank")}
                      >
                        <UilEye size="16" />
                        <span>View</span>
                      </button>
                      {userRole === "COMPANY_SUPERVISOR" &&
                        !report.verified && (
                          <button
                            className="flex items-center space-x-1 px-3 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors"
                            onClick={() => handleVerify(report.id)}
                          >
                            <UilCheck size="16" />
                            <span>Verify</span>
                          </button>
                        )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
