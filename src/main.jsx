import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserProvider } from "./context/UserContext.jsx";
import LayoutA from "./components/LayoutA";
import HomePage from "./components/HomePage.jsx";
import { ReportsPage } from "./components/ReportsPage.jsx";
import { StudentInformation } from "./components/StudentInformation.jsx";
import { StudentProvider } from "./context/StudentContext.jsx";
// import { ReportsProvider } from "./ReportsContext.jsx";
import ApplicationStatus from "./components/ApplicationStatus.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Login from "./components/Login.jsx";
import TaskForm from "./components/TaskForm.jsx";
import {MyTasks } from "./components/MyTasks.jsx";
import { TaskProvider } from "./context/TaskContext";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />, // Login page is now separate from LayoutA
  },
  {
    path: "/",
    element: <LayoutA />,
    children: [
      { path: "home", element: <HomePage /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "reports", element: <ReportsPage /> },
          { path: "TaskForm", element: <TaskForm /> },
          { path: "tasks", element: <MyTasks /> },
          { path: "studentsinfo", element: <StudentInformation /> },
          { path: "track", element: <ApplicationStatus /> },
        ],
      },
    ],
  },
]);


const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <UserProvider>
      <StudentProvider>
        <TaskProvider>
          <RouterProvider router={router} />
   </TaskProvider>
      </StudentProvider>
    </UserProvider>
  </StrictMode>
);
