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
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Login from "./components/Login.jsx";
import TaskForm from "./components/TaskForm.jsx";
import { MyTasks } from "./components/MyTasks.jsx";
import { TaskProvider } from "./context/TaskContext";
import MainPage from "./components/MainPage.jsx";
import InternshipDetail from "./components/InternshipDetails.jsx";
import ChatApp from "./components/ChatApp.jsx";
import SignUp from "./components/SignUp.jsx";
import ProgressCharts from "./components/ProgressCharts.jsx";
import { InternshipProvider } from "./context/InternshipContext.jsx";
import InternshipList from "./components/internshipList.jsx";
import { ManageAnnouncement } from "./components/ManageAnnouncement.jsx";
import AddNewAnnouncement from "./components/AddNewAnnouncement.jsx";
import { ApplicationProvider } from "./context/ApplicationContext.jsx";
import ApplicationsTable from "./components/ApplicationsTable.jsx";
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
          { path: "internships", element: <InternshipList /> },
          { path: "announcements", element: <ManageAnnouncement /> },
          { path: "addannouncements", element: <AddNewAnnouncement /> },
          { path: "TaskForm", element: <TaskForm /> },
          { path: "tasks", element: <MyTasks /> },
          { path: "taskprogress", element: <ProgressCharts /> },
          { path: "studentsinfo", element: <StudentInformation /> },
          { path: "track", element: <ApplicationsTable /> },
          {
            path: "internshipDetails/internships/:id",
            element: <InternshipDetail />,
          },
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
      <TaskProvider>
        <ApplicationProvider>
          <InternshipProvider>
            <StudentProvider>
              <RouterProvider router={router} />
            </StudentProvider>
          </InternshipProvider>
        </ApplicationProvider>
      </TaskProvider>
    </UserProvider>
  </StrictMode>
);
