import React, { useState } from "react";
import { useTasks } from "../context/TaskContext";
import { Task } from "./Task";

export const MyTasks = () => {
  const { tasks, loading, toggleTask } = useTasks();
  const [filter, setFilter] = useState("all");

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  // Calculate progress
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const filteredTasks = Array.isArray(tasks)
    ? tasks.filter((task) => {
        if (filter === "completed") return task.completed;
        if (filter === "incomplete") return !task.completed;
        return true;
      })
    : [];

  return (
    <div className="px-16 pt-9 flex justify-center w-full">
      <div className="w-full max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">My Tasks</h1>

        {/* Flex container for progress and filter */}
        <div className="flex items-center justify-start mb-4 gap-4">
          {/* Progress Bar Container */}
          <div className="flex items-center gap-2">
            <div className="w-80 bg-gray-300 h-4 rounded-lg overflow-hidden">
              <div
                className="bg-green-500 h-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="text-gray-700 font-medium">
              {Math.round(progress)}% Completed
            </span>
          </div>

{/* Filter Dropdown (Right-aligned) */}
<select
  className="bg-white border-2 border-gray-500 text-black px-4 py-2 rounded-lg ml-auto focus:outline-none focus:ring-2 focus:ring-pink-500 hover:shadow-lg transition-shadow duration-300"
  value={filter}
  onChange={(e) => setFilter(e.target.value)}
>
  <option value="all">All Tasks</option>
  <option value="completed">Completed</option>
  <option value="incomplete">Incomplete</option>
</select>


        </div>

        <div className="bg-gray-100 mt-10 px-8 py-10 rounded-lg shadow-lg">
          {filteredTasks.length === 0 ? (
            <p className="text-center">No tasks available</p>
          ) : (
            filteredTasks.map((task) => (
              <Task key={task.id} task={task} toggleTask={toggleTask} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
