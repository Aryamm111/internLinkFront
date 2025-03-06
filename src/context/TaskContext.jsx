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
      setLoading(false); 
    } catch (error) {
      console.error("Error fetching tasks:", error.response?.data || error);
      setTasks([]);
      setLoading(false); // Set loading to false in case of error
    }
  };

  const toggleTask = async (taskId) => {
    try {
      const response = await axios.put(
        `http://localhost:8081/api/tasks/tasks/${taskId}/complete`, 
        {}, // Empty object instead of passing `withCredentials` here
        { withCredentials: true }
      );
  
      const updatedTask = response.data; // Assuming the API returns the updated task
  
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, completed: updatedTask.completed } : task
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
    <TaskContext.Provider value={{ tasks, loading, toggleTask }}>
      {children}
    </TaskContext.Provider>
  );
};
