import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserProvider, useUser } from "./UseContext.jsx";
import LayoutA from "./components/LayoutA";
import { StudentInfo } from "./components/StudentInfo.jsx";
import TaskForm  from "./components/TaskForm.jsx";
import HomePage from "./components/HomePage.jsx";
import { companySupervisorCards,studentCards ,facultySupervisorCards } from "./components/CardsData,js";

const cardsDataMap = {
  student: studentCards,
  companySupervisor: companySupervisorCards,
  facultySupervisor: facultySupervisorCards
};

const App = () => {
  const { userRole } = useUser(); 
  const cardsData = cardsDataMap[userRole] || [];

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LayoutA />,
      children: [
        { path: "studentsinfo", element: <StudentInfo /> },
        // { path: "reports", element: <ReportsPage /> }
        { path: "TaskForm", element: <TaskForm />},
    { path: "AddNewAnnouncement", element: <AddNewAnnouncement /> },
        { path: "home", element: <HomePage  cardsData={cardsData} />},
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <UserProvider>
      <App /> 
    </UserProvider>
  </StrictMode>
);
