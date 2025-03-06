import React, { useState } from "react";
import { useTasks } from "../TaskContext";

export const Task = ({ task, toggleTask }) => {
  const isCompleted = task.status === "COMPLETED"; // Adjust based on actual values

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





  
export const  MyTasks = () => {
    const { tasks, loading, toggleTask } = useTasks();
    const [filter, setFilter] = useState("all");
    console.log("Tasks received:", tasks);

    if (loading) return <p>Loading tasks...</p>;
  
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
  
          {/* Filter Dropdown */}
          <select className="border px-3 py-1 rounded-lg" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Tasks</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
          </select>
  
          {/* Task List */}
          <div className="bg-gray-100 px-8 py-10 rounded-lg shadow-lg w-full">
            {filteredTasks.length === 0 ? (
              <p>No tasks available</p>
            ) : (
              filteredTasks.map((task) => <Task key={task.id} task={task} toggleTask={toggleTask} />)
            )}
          </div>
        </div>
      </div>
    );
  };
  
