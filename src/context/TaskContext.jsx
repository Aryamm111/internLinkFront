import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [taskProgress, setTaskProgress] = useState({
    completed: 0,
    pending: 0,
    overdue: 0,
  });
  const [studentTaskBreakdown, setStudentTaskBreakdown] = useState({
    completed: 0,
    pending: 0,
    overdue: 0,
  });

  //fetch tasks by student
  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/api/tasks/student",
        {
          withCredentials: true,
        }
      );
      setTasks(Array.isArray(response.data) ? response.data : []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tasks:", error.response?.data || error);
      setTasks([]);
      setLoading(false);
    }
  };

  // All tasks progress
  const fetchTaskProgress = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/api/tasks/progress",
        { withCredentials: true }
      );
      console.log("Fetched task progress:", response.data);
      setTaskProgress(response.data);
    } catch (error) {
      console.error(
        "Error fetching task progress:",
        error.response?.data || error
      );
      setTaskProgress({
        completed: 0,
        pending: 0,
        overdue: 0,
      });
    }
  };

  //fetch tasks of a student by supervisor and calculate the student progress
  const fetchTasksForStudent = async (studentId) => {
    try {
      const response = await axios.get(
        "http://localhost:8081/api/tasks/student",
        {
          withCredentials: true,
          params: { studentId },
        }
      );
      setTasks(response.data);
      const completed = response.data.filter((task) => task.completed).length;
      const pending = response.data.filter(
        (task) => !task.completed && new Date(task.dueDate) >= new Date()
      ).length;
      const overdue = response.data.filter(
        (task) => !task.completed && new Date(task.dueDate) < new Date()
      ).length;
      setStudentTaskBreakdown({ completed, pending, overdue });
    } catch (error) {
      console.error("Error fetching tasks for student:", error);
      setStudentTaskBreakdown({ completed: 0, pending: 0, overdue: 0 });
    }
  };

  //change the completed field from false to true or vice versa
  const toggleTask = async (taskId) => {
    try {
      const response = await axios.put(
        `http://localhost:8081/api/tasks/${taskId}/complete`,
        {},
        { withCredentials: true }
      );
      const updatedTask = response.data;
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId
            ? { ...task, completed: updatedTask.completed }
            : task
        )
      );
    } catch (error) {
      console.error("Error toggling task:", error.response?.data || error);
    }
  };

  const createTask = async (taskData) => {
    try {
      const response = await axios.post(
        "http://localhost:8081/api/tasks/create",
        taskData,
        { withCredentials: true }
      );
      const newTask = response.data;
      setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (error) {
      throw error;
    }
  };

  
  const fetchStudentsTasksForSupervisor = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/api/tasks/supervisor/studentstasks",
        { withCredentials: true }
      );
      console.log("Fetched students' tasks for supervisor:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching students' tasks for supervisor:",
        error.response?.data || error
      );
      return [];
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        taskProgress,
        studentTaskBreakdown, // NEW: Expose breakdown for specific student
        loading,
        fetchTasks,
        fetchTaskProgress,
        toggleTask,
        createTask,
        fetchTasksForStudent,
        fetchStudentsTasksForSupervisor, // NEW: Expose fetchTasksForStudent function
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};
