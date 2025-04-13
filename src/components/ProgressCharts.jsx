import React, { useState, useEffect } from "react";
import { useTasks } from "../context/TaskContext";
import { useStudents } from "../context/StudentContext";
import { UilSearch } from "@iconscout/react-unicons";

const ProgressCharts = () => {
  const { students, selectedStudent, setSelectedStudent, fetchStudents } =
    useStudents();
  useEffect(() => {
    const load = async () => {
      await fetchStudents();
    };
    load();
  }, []);

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

  useEffect(() => {
    const loadTasks = async () => {
      await fetchTasks();
      await fetchTaskProgress();
      const data = await fetchStudentsTasksForSupervisor();
      setStudentsTasks(data);
    };

    loadTasks();
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
  useEffect(() => {
    console.log("Filtered students:", filteredStudents);
  }, [filteredStudents]);
  useEffect(() => {
    console.log("All students:", students);
  }, [students]);
  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
    fetchTasksForStudent(student.id);
    setSearchQuery(student.name);
    setShowSuggestions(false);
  };

  const radius = 10;
  const circumference = 2 * Math.PI * radius;

  return (
    <div>
      <div className="mt-5">
        <h1>Task progress</h1>
      </div>
      <div className="shadow-sm rounded-lg mb-5 bg-gray-50">
        <div className="flex flex-wrap justify-center space-x-10 py-6 space-y-6 md:space-y-0">
          {["completed", "pending", "overdue"].map((type, index) => (
            <div key={index} className="text-center">
              <svg className="w-20 h-20" viewBox="0 0 32 32">
                <circle
                  r={radius}
                  cx="16"
                  cy="16"
                  fill="transparent"
                  stroke={
                    type === "completed"
                      ? "blue"
                      : type === "pending"
                      ? "gray"
                      : "red"
                  }
                  strokeWidth="3"
                  strokeDasharray={`${
                    (taskProgress[type] / 100) * circumference
                  } ${circumference}`}
                  strokeLinecap="round"
                  transform="rotate(-90 16 16)"
                />
              </svg>
              <p
                className={`mt-2 text-m font-semibold text-${
                  type === "completed"
                    ? "green"
                    : type === "pending"
                    ? "gray"
                    : "red"
                }-700`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}:{" "}
                {taskProgress[type].toFixed(1)}%
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-4 mb-4">
        {["Students", "Tasks"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 ${
              activeTab === tab
                ? "underline underline-offset-8 text-blue-500 font-bold"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Students" ? (
        <div className="bg-gray-50 max-w-screen-lg mb-10 min-h-[200px] mt-5 rounded-lg">
          <div className="flex flex-col items-center">
            <div className="relative bg-white mt-5 w-full max-w-md">
              <div className="flex items-center bg-white border rounded-lg p-2">
                <UilSearch className="text-gray-500 w-6 h-6" />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => {
                    if (filteredStudents.length > 0) setShowSuggestions(true);
                  }}
                  className="flex-grow px-2 text-gray-700 bg-white focus:outline-none"
                />
              </div>

              {showSuggestions && (
                <ul className="absolute left-0 right-0 z-10 bg-white border rounded-lg mt-1 max-h-40 overflow-y-auto shadow-lg z-30">
                  {filteredStudents.map((student) => (
                    <li
                      key={student.id}
                      className="p-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSelectStudent(student)}
                    >
                      <div className="flex justify-between">
                        <span>{student.name}</span>
                        <span className="text-gray-500 text-sm">
                          {student.id}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {selectedStudent && (
            <div className="m-10 flex flex-col items-center">
              <h2 className="text-xl font-semibold">
                Tasks for {selectedStudent.name}
              </h2>
              <div className="flex justify-center space-x-4 my-4">
                {["completed", "pending", "overdue"].map((type, index) => (
                  <div key={index} className="text-center">
                    <div
                      className={`w-16 h-2 bg-${
                        type === "completed"
                          ? "blue"
                          : type === "pending"
                          ? "gray"
                          : "red"
                      }-500`}
                    ></div>
                    <p className="text-sm">
                      {type.charAt(0).toUpperCase() + type.slice(1)}:{" "}
                      {studentTaskBreakdown[type]}
                    </p>
                  </div>
                ))}
              </div>
              <div className="space-y-2 mb-10">
                {tasks.map((task) => (
                  <details
                    key={task.id}
                    className="border bg-white w-[600px] rounded-lg p-2"
                  >
                    <summary
                      className="cursor-pointer font-semibold underline"
                      style={{
                        textDecorationColor: task.completed ? "blue" : "red",
                      }}
                    >
                      {task.title}
                    </summary>
                    <p className="text-sm mt-1 text-gray-600">
                      {task.description}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-gray-100 max-w-screen-lg mb-10 min-h-[200px] mt-5 rounded-lg">
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-4">Task List</h2>
            <div className="space-y-2 justify-center items-center overflow-hidden">
              {Object.values(studentsTasks)
                .flat()
                .map((task) => (
                  <details
                    key={task.id}
                    className="border bg-white w-[600px] rounded-lg p-2"
                  >
                    <summary
                      className="cursor-pointer font-semibold underline"
                      style={{
                        textDecorationColor: task.completed ? "blue" : "red",
                      }}
                    >
                      {task.title}
                    </summary>
                    <p className="text-sm mt-1 text-gray-600">
                      {task.description || "No additional details available."}
                    </p>
                  </details>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressCharts;
