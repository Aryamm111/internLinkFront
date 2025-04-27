import React from "react";

export const Task = ({ task, toggleTask }) => {
  const isCompleted = task.completed;

  return (
    <div
      className={`relative flex justify-between items-center p-6 rounded-xl mb-4 w-full transition-all duration-300 overflow-hidden group ${
        isCompleted
          ? "bg-gradient-to-r from-gray-50 to-gray-100 border-l-4 border-gray-300"
          : "bg-white hover:shadow-lg hover:-translate-y-0.5 border-l-4 border-transparent hover:border-pink-300"
      }`}
    >
      {!isCompleted && (
        <div className="absolute inset-0 bg-gradient-to-r from-pink-50/30 to-purple-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0" />
      )}

      <div className="flex items-center w-full z-10">
        <input
          type="checkbox"
          className={`mr-6 h-6 w-6 cursor-pointer appearance-none rounded-full border-2 ${
            isCompleted
              ? "border-green-400 bg-green-400 bg-checkmark"
              : "border-pink-300 hover:border-pink-400"
          } transition-all duration-200 relative`}
          checked={isCompleted}
          onChange={() => toggleTask(task.id)}
        />

        <div className="flex-1 min-w-[500px] max-w-[600px]">
          <h2
            className={`text-lg font-semibold ${
              isCompleted
                ? "line-through text-gray-500"
                : "text-gray-800 group-hover:text-gray-900"
            } transition-colors duration-200`}
          >
            {task.title}
          </h2>
          <p
            className={`${
              isCompleted
                ? "text-gray-400"
                : "text-gray-600 group-hover:text-gray-700"
            } transition-colors duration-200`}
          >
            {task.description}
          </p>
        </div>
      </div>

      <span
        className={`text-sm px-3 py-1 w-40 rounded-full ${
          isCompleted
            ? "text-gray-500 bg-gray-100"
            : "text-pink-600 bg-pink-50 group-hover:bg-pink-100"
        } transition-colors duration-200 z-10`}
      >
        {task.dueDate || "No due date"}
      </span>
    </div>
  );
};
