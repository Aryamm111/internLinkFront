import React from "react";

export const Task = ({ task, toggleTask }) => {
  const isCompleted = task.completed; 
  console.log("Rendering task:", task);

  return (
    <div
      className={`flex justify-between items-center bg-white p-6 rounded-lg shadow-md mb-4 w-full transition-all duration-300 ${
        isCompleted ? "opacity-60" : "hover:shadow-lg hover:scale-[1.02]"
      }`}
    >
      <div className="flex items-center w-full">
        <input
          type="checkbox"
          className="mr-6 h-6 w-6 cursor-pointer accent-green-500"
          checked={isCompleted}
          onChange={() => toggleTask(task.id)} 
        />
        <div className="flex-1 min-w-[500px] max-w-[600px]">
          <h2 className={`text-lg font-semibold ${isCompleted ? "line-through text-gray-500" : ""}`}>
            {task.title}
          </h2>
          <p className="text-gray-600">{task.description}</p>
        </div>
      </div>
      <span className="text-sm text-gray-500">{task.dueDate || "No due date"}</span>
    </div>
  );
};
