import React, { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { useStudents } from "../context/StudentContext";
import {
  UilPen,
  UilCheckCircle,
  UilBookAlt,
  UilAwardAlt,
} from "@iconscout/react-unicons";

function UpdateStudentPage() {
  const {
    userId,
    userName,
    userEmail,
    userMajor,
    userGpa,
    userSkills,
    findEmailById,
  } = useUser();

  const { students, updateStudent, fetchSupervisorIds } = useStudents();

  const [skills, setSkills] = useState(userSkills.join(", ") || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loadingEmails, setLoadingEmails] = useState(false);
  const [facultyEmail, setFacultyEmail] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [studentDetails, setStudentDetails] = useState({});

  // Fetch the student details when students list or userId changes

  // Fetch the faculty and company supervisor emails
  // UpdateStudentPage.js
  useEffect(() => {
    if (!userId) return;

    const fetchEmails = async () => {
      const { facultySupervisorId, companySupervisorId } =
        await fetchSupervisorIds(userId);

      // Parallelize email fetching
      const [facultyEmail, companyEmail] = await Promise.all([
        facultySupervisorId
          ? findEmailById(facultySupervisorId)
          : Promise.resolve(null),
        companySupervisorId
          ? findEmailById(companySupervisorId)
          : Promise.resolve(null),
      ]);

      setFacultyEmail(facultyEmail);
      setCompanyEmail(companyEmail);
    };

    fetchEmails();
  }, [userId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const updatedData = {
      major: userMajor,
      gpa: userGpa,
      skills: skills.split(",").map((skill) => skill.trim()),
    };

    try {
      await updateStudent(updatedData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Update failed:", error);
      alert("Update failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="mb-6">Update</h1>
      <div className="max-w-lg mx-auto p-6 bg-gray-50 rounded-lg shadow-md mt-8 mb-23">
        <div className="flex items-center mb-6">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-300 to-purple-400 flex items-center justify-center text-white font-medium mr-3">
            {userName?.charAt(0).toUpperCase() || "U"}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">{userName}</h2>
            <p className="text-xs text-gray-500">{userEmail}</p>
          </div>
        </div>

        {/* Supervisor Emails */}
        <div className="space-y-2 mb-6">
          <p className="text-sm text-gray-700">
            <strong>Faculty Supervisor Email:</strong> {facultyEmail || "N/A"}
          </p>
          <p className="text-sm text-gray-700">
            <strong>Company Supervisor Email:</strong> {companyEmail || "N/A"}
          </p>
        </div>

        <form onSubmit={handleUpdate} className="space-y-4">
          {/* Major Field (readonly) */}
          <div className="space-y-1">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <UilBookAlt className="mr-2 text-indigo-500" size="16" />
              Major
            </label>
            <input
              type="text"
              value={userMajor || "Undeclared"}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700"
            />
          </div>

          {/* GPA Field (readonly) */}
          <div className="space-y-1">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <UilAwardAlt className="mr-2 text-indigo-500" size="16" />
              GPA
            </label>
            <input
              type="number"
              step="0.01"
              value={userGpa || "0.00"}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700"
            />
          </div>

          {/* Skills Field (editable) */}
          <div className="space-y-1">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <UilPen className="mr-2 text-indigo-500" size="16" />
              Skills (comma separated)
            </label>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="e.g., JavaScript, Python, Design"
              className="w-full px-3 bg-white py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full mt-6 flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              isSubmitting
                ? "bg-indigo-400"
                : "bg-indigo-600 hover:bg-indigo-700"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            {isSubmitting ? (
              "Updating..."
            ) : (
              <>
                <UilCheckCircle className="mr-2" size="18" />
                {success ? "Updated Successfully!" : "Update Skills"}
              </>
            )}
          </button>

          {success && (
            <div className="p-3 text-sm text-green-700 bg-green-50 rounded-md">
              Skills updated successfully!
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default UpdateStudentPage;
