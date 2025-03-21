import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { UserProvider } from "./context/UserContext.jsx";
import LayoutA from "./components/LayoutA";
import HomePage from "./components/HomePage.jsx";
import { ReportsPage } from "./components/ReportsPage.jsx";
import { StudentInformation } from "./components/StudentInformation.jsx";
import { StudentProvider } from "./context/StudentContext.jsx";
import ApplicationStatus from "./components/ApplicationStatus.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Login from "./components/Login.jsx";
import TaskForm from "./components/TaskForm.jsx";
import { MyTasks } from "./components/MyTasks.jsx";
import { TaskProvider } from "./context/TaskContext";
import MainPage from "./components/MainPage.jsx";

import ChatApp from "./components/ChatApp.jsx";
import SignUp from "./components/SignUp.jsx";
const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/main",
    element: <LayoutA />,

    children: [
      { path: "", element: <Navigate to="home" replace /> },

      {
        element: <ProtectedRoute />,
        children: [
          { path: "home", element: <HomePage /> },
          { path: "reports", element: <ReportsPage /> },
          { path: "connect", element: <ChatApp /> },
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
