import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserProvider, useUser } from "./UseContext.jsx";
import LayoutA from "./components/LayoutA";
import { StudentInfo } from "./components/StudentInfo.jsx";

const App = () => {
  const { userRole } = useUser(); 
  

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LayoutA />,
      children: [
        { path: "studentsinfo", element: <StudentInfo /> },
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
