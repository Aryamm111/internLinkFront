import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/tasks/tasks", {
        withCredentials: true,
      });
      console.log("Fetched tasks:", response.data);
      setTasks(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching tasks:", error.response?.data || error);
      setTasks([]);
    }
  };
  


  
  // Toggle task completion
  const toggleTask = async (taskId) => {
    try {
      await axios.put(`/api/tasks/${taskId}/toggle`, { withCredentials: true });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId
            ? { ...task, completed: task.completed ? !task.completed : true } // Ensure it exists
            : task
        )
      );
    } catch (error) {
      console.error("Error toggling task:", error.response?.data || error);
    }
  };
  
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, loading, toggleTask, fetchTasks }}>
      {children}
    </TaskContext.Provider>
  );
};
