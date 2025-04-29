import React, { useState, useEffect } from "react";
import { useTasks } from "../context/TaskContext";
import { useStudents } from "../context/StudentContext";
import {
  UilSearch,
  UilCheckCircle,
  UilExclamationTriangle,
} from "@iconscout/react-unicons";

const ProgressCharts = () => {
  const { students, selectedStudent, setSelectedStudent, fetchStudents } =
    useStudents();
  const {
    taskProgress,
    fetchTasksForStudent,
    studentTaskBreakdown,
    tasks,
    fetchStudentsTasksForSupervisor,
    fetchTasks,
    fetchTaskProgress,
  } = useTasks();

  const [studentsTasks, setStudentsTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeTab, setActiveTab] = useState("Students");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        await fetchStudents();
        await fetchTasks();
        await fetchTaskProgress();
        const data = await fetchStudentsTasksForSupervisor();
        setStudentsTasks(data);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredStudents([]);
      setShowSuggestions(false);
      return;
    }

    const timer = setTimeout(() => {
      const results = students.filter(
        (student) =>
          (student.name &&
            student.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (student.id &&
            student.id.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredStudents(results);
      setShowSuggestions(results.length > 0);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, students]);

  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
    fetchTasksForStudent(student.id);
    setSearchQuery(student.name);
    setShowSuggestions(false);
  };

  const radius = 10;
  const circumference = 2 * Math.PI * radius;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
          Student Progress Dashboard
        </h1>
      </div>

      {/* Progress Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {["completed", "pending", "overdue"].map((type) => (
          <div
            key={type}
            className={`rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg ${
              type === "completed"
                ? "bg-gradient-to-br from-green-50 to-blue-50 border-l-4 border-green-400"
                : type === "pending"
                ? "bg-gradient-to-br from-yellow-50 to-orange-50 border-l-4 border-yellow-400"
                : "bg-gradient-to-br from-red-50 to-pink-50 border-l-4 border-red-400"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-700">
                  {type.charAt(0).toUpperCase() + type.slice(1)} Tasks
                </h3>
                <p className="text-2xl font-bold mt-2">
                  {taskProgress[type].toFixed(1)}%
                </p>
              </div>
              <div className="relative w-16 h-16">
                <svg className="w-full h-full" viewBox="0 0 32 32">
                  <circle
                    r={radius}
                    cx="16"
                    cy="16"
                    fill="transparent"
                    stroke={
                      type === "completed"
                        ? "#10B981"
                        : type === "pending"
                        ? "#F59E0B"
                        : "#EF4444"
                    }
                    strokeWidth="3"
                    strokeDasharray={`${
                      (taskProgress[type] / 100) * circumference
                    } ${circumference}`}
                    strokeLinecap="round"
                    transform="rotate(-90 16 16)"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-sm font-medium">
                  {taskProgress[type].toFixed(0)}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-gray-200 mb-6">
        {["Students", "Tasks"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === tab
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Students Tab Content */}
      {activeTab === "Students" && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="relative max-w-md mx-auto mb-8">
            <div className="flex items-center bg-white border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
              <UilSearch className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search students by name or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => {
                  if (filteredStudents.length > 0) setShowSuggestions(true);
                }}
                className="flex-grow bg-white outline-none text-gray-700 placeholder-gray-400"
              />
            </div>

            {showSuggestions && (
              <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {filteredStudents.map((student) => (
                  <li
                    key={student.id}
                    className="p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => handleSelectStudent(student)}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{student.name}</span>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {student.id}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {selectedStudent && (
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  {selectedStudent.name}'s Tasks
                </h2>
                <div className="flex space-x-4">
                  {["completed", "pending", "overdue"].map((type) => (
                    <div key={type} className="text-center">
                      <div className="flex items-center">
                        <div
                          className={`w-3 h-3 rounded-full mr-2 ${
                            type === "completed"
                              ? "bg-green-500"
                              : type === "pending"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                        ></div>
                        <span className="text-sm font-medium">
                          {studentTaskBreakdown[type]}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 capitalize">
                        {type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`p-4 rounded-lg border ${
                      task.completed
                        ? "border-green-200 bg-green-50"
                        : "border-red-200 bg-red-50"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium flex items-center">
                          {task.completed ? (
                            <UilCheckCircle className="text-green-600 mr-2" />
                          ) : (
                            <UilExclamationTriangle className="text-red-500 mr-2" />
                          )}
                          {task.title}
                        </h3>
                        {task.description && (
                          <p className="text-sm text-gray-600 mt-1">
                            {task.description}
                          </p>
                        )}
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          task.completed
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {task.completed ? "Completed" : "Pending"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tasks Tab Content */}
      {activeTab === "Tasks" && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            All Student Tasks
          </h2>
          <div className="space-y-4">
            {Object.values(studentsTasks)
              .flat()
              .map((task) => (
                <div
                  key={task.id}
                  className={`p-4 rounded-lg border ${
                    task.completed
                      ? "border-green-200 bg-green-50"
                      : "border-red-200 bg-red-50"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium flex items-center">
                        {task.completed ? (
                          <UilCheckCircle className="text-green-600 mr-2" />
                        ) : (
                          <UilExclamationTriangle className="text-red-500 mr-2" />
                        )}
                        {task.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {task.description || "No additional details available."}
                      </p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span
                        className={`text-xs px-2 py-1 rounded-full mb-1 ${
                          task.completed
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {task.completed ? "Completed" : "Pending"}
                      </span>
                      {task.studentName && (
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {task.studentName}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressCharts;
