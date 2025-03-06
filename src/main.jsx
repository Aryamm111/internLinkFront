import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserProvider } from "./UserContext.jsx";
import LayoutA from "./components/LayoutA";
import HomePage from "./components/HomePage.jsx";
import { ReportsPage } from "./components/ReportsPage.jsx";
import { StudentInformation } from "./components/StudentInformation.jsx";
import { StudentProvider } from "./StudentContext.jsx";
// import { ReportsProvider } from "./ReportsContext.jsx";
import ApplicationStatus from "./components/ApplicationStatus.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Login from "./components/Login.jsx";
import TaskForm from "./components/TaskForm.jsx";
import {MyTasks } from "./components/MyTasks.jsx";
import { TaskProvider } from "./TaskContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutA />,
    children: [
      { path: "/", element: <Login /> },
      { path: "home", element: <HomePage /> },
      { path: "login", element: <Login /> }, 

      {
        element: <ProtectedRoute />,
        children: [
          { path: "reports", element: <ReportsPage /> },
          { path: "TaskForm", element: <TaskForm /> },
             // { path: "AddNewAnnouncement", element: <AddNewAnnouncement /> },
          { path: "tasks", element: <MyTasks/>},
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
