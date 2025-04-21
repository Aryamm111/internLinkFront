import React, { useState } from "react";
import { useTasks } from "../context/TaskContext"; // Import the TaskContext hook
import {
  UilLabelAlt,
  UilUser,
  UilFileAlt,
  UilCalendarAlt,
} from "@iconscout/react-unicons";

const TaskForm = () => {
  const { createTask } = useTasks();
  const [task, setTask] = useState({
    title: "",
    description: "",
    studentId: "",
    dueDate: "",
  });

  const [notification, setNotification] = useState("");

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createTask({
        title: task.title,
        description: task.description,
        assignedStudentId: task.studentId,
        dueDate: task.dueDate,
      });

      setNotification("Task Assigned Successfully!");
      setTimeout(() => setNotification(""), 3000);

      setTask({
        title: "",
        description: "",
        studentId: "",
        dueDate: "",
      });
    } catch (error) {
      setNotification("Error assigning task. Please try again!");
      setTimeout(() => setNotification(""), 3000);
    }
  };

  return (
    <div className="p-10 w-full max-w-6xl">
      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Task</h2>

      {/* Notification */}
      {notification && (
        <div className="fixed mt-80 ml-20 bg-green-500 text-white py-2 px-4 rounded-md shadow-md">
          {notification}
        </div>
      )}

      <div className="bg-gray-100 px-8 py-10 rounded-lg">
        <div className="bg-white p-10 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              {/* Task Name */}
              <div className="flex items-center gap-2">
                <UilLabelAlt className="text-indigo-300" />
                <div className="w-full">
                  <label className="font-semibold text-gray-700">
                    Task Name
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={task.title}
                    onChange={handleChange}
                    className="w-full border bg-white focus:outline-none focus:ring-2 focus:ring-pink-100 border-gray-300 rounded-md p-2"
                    required
                  />
                </div>
              </div>

              {/* Student ID */}
              <div className="flex items-center gap-2">
                <UilUser className="text-indigo-300" />
                <div className="w-full">
                  <label className="font-semibold text-gray-700">
                    Student ID
                  </label>
                  <input
                    type="text"
                    name="studentId"
                    value={task.studentId}
                    onChange={handleChange}
                    className="w-full border bg-white focus:outline-none focus:ring-2 focus:ring-pink-100 border-gray-300 rounded-md p-2"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="flex items-start gap-2">
              <UilFileAlt className="text-indigo-300 mt-2" />
              <div className="w-full">
                <label className="font-semibold text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={task.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full border bg-white focus:outline-none focus:ring-2 focus:ring-pink-100 border-gray-300 rounded-md p-2"
                  required
                />
              </div>
            </div>

            {/* Due Date */}
            <div className="flex items-center gap-2">
              <UilCalendarAlt className="text-indigo-300" />
              <div className="w-full">
                <label className="font-semibold text-gray-700">Due Date</label>
                <input
                  type="date"
                  name="dueDate"
                  value={task.dueDate}
                  onChange={handleChange}
                  className="w-full border bg-white focus:outline-none focus:ring-2 focus:ring-pink-100 border-gray-300 rounded-md p-2"
                  lang="en"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Assign Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
