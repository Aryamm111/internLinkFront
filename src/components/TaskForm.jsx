import React, { useState } from "react";

const TaskForm = () => {
  const [task, setTask] = useState({
    taskName: "",
    description: "",
    studentId: "",
    dueDate: "",
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Task Submitted:", task);
    alert("Task Assigned Successfully!");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-3xl">
        {/* title*/}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Add New Task</h2>

        {/* الصندوق الرمادي */}
        <div className="bg-gray-200 p-8 rounded-lg">
          {/* الصندوق الأبيض للفورم */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4 items-center">
                <label className="font-semibold text-gray-700">Task Name</label>
                <input
                  type="text"
                  name="taskName"
                  value={task.taskName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4 items-center">
                <label className="font-semibold text-gray-700">Description</label>
                <input
                  type="text"
                  name="description"
                  value={task.description}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4 items-center">
                <label className="font-semibold text-gray-700">Student ID</label>
                <input
                  type="text"
                  name="studentId"
                  value={task.studentId}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4 items-center">
                <label className="font-semibold text-gray-700">Due Date</label>
                <input
                  type="date"
                  name="dueDate"
                  value={task.dueDate}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
            </form>
          </div>

          {/* زر الإرسال داخل الصندوق الرمادي */}
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Assign Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
