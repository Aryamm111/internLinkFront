import React, { useEffect, useState } from "react";
import { useReports } from "../context/ReportContext";
import { UilFileAlt } from "@iconscout/react-unicons";
import {
  UilCheckCircle,
  UilExclamationTriangle,
} from "@iconscout/react-unicons";

const StudentReport = () => {
  const { reports, loading, fetchReports, uploadMyReport } = useReports();

  const [showModal, setShowModal] = useState(false);
  const [newFile, setNewFile] = useState(null);
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    fetchReports();
  }, []);

  const handleUpload = async () => {
    if (!newFile || !newTitle.trim())
      return alert("File and title are required");

    try {
      await uploadMyReport(newFile); // title not used currently in backend
      setShowModal(false);
      setNewFile(null);
      setNewTitle("");
      fetchReports(); // Refresh list
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed");
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="mb-4 md:mb-0">My Reports</h1>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg mt-5 transition-all duration-300 transform hover:scale-105"
          onClick={() => setShowModal(true)}
        >
          Upload Report
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center bg-gray-50 items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
        </div>
      ) : reports.length === 0 ? (
        <div className="bg-gray-50 rounded-xl p-8 text-center">
          <p className="text-gray-600 text-lg">
            No reports found. Upload your first report!
          </p>
        </div>
      ) : (
        <div className="space-y-6  rounded-lg w-full p-5 bg-gray-50">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.map((report, index) => (
              <div
                key={report.id}
                className={`rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${
                  index % 2 === 0
                    ? "bg-gradient-to-br from-pink-50 to-blue-50 border-l-4 border-pink-400"
                    : "bg-gradient-to-br from-indigo-50 to-blue-50 border-l-4 border-indigo-400"
                }`}
              >
                <div className="p-5 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-gray-800 text-lg truncate">
                      {report.fileUrl
                        .split("/")
                        .pop()
                        .split("_")
                        .slice(1)
                        .join("_")}
                    </h3>
                    <div>
                      {report.verified ? (
                        <UilCheckCircle
                          className="text-green-600 text-xl"
                          title="Verified"
                        />
                      ) : (
                        <UilExclamationTriangle
                          className="text-yellow-500 text-xl"
                          title="Not Verified"
                        />
                      )}
                    </div>
                  </div>

                  <div className="flex-grow flex flex-col items-center justify-center my-4">
                    <a
                      href={report.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 text-5xl hover:scale-110 transition-transform duration-200"
                    >
                      <UilFileAlt />
                    </a>
                    <span className="text-sm text-gray-500 mt-2">
                      Click to view
                    </span>
                  </div>

                  <div
                    className={`text-xs px-3 py-1 rounded-full self-start ${
                      report.verified
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {report.verified ? "Verified" : "Pending Verification"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-2xl">
            <h2 className="text-xl font-semibold mb-4 text-indigo-700">
              Upload New Report
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1">Report Title</label>
                <input
                  type="text"
                  placeholder="Enter title"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">PDF File</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setNewFile(e.target.files[0])}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer text-blue-500 hover:text-blue-700"
                  >
                    {newFile ? (
                      <span className="font-medium">{newFile.name}</span>
                    ) : (
                      <span>Click to select PDF file</span>
                    )}
                  </label>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                onClick={handleUpload}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentReport;
