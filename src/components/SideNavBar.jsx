import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import {
  UilEstate,
  UilFileGraph,
  UilCommentsAlt,
  UilUserExclamation,
  UilFilePlusAlt,
  UilCheckSquare,
  UilBriefcaseAlt,
  UilListUl,
  UilUserCheck,
  UilMegaphone,
  UilFilesLandscapesAlt,
} from "@iconscout/react-unicons";
import { useLocation } from "react-router-dom";

const navLinksMap = {
  HR_MANAGER: [
    { name: "Home", href: "/main/home", icon: <UilEstate /> },
    {
      name: "Announcements",
      href: "/main/announcements",
      icon: <UilMegaphone />,
    },
    {
      name: "Applications",
      href: "/main/applications",
      icon: <UilFilesLandscapesAlt />,
    },
    {
      name: "Assign Supervisor",
      href: "/main/assign-supervisor",
      icon: <UilUserCheck />,
    },
  ],
  STUDENT: [
    { name: "Home", href: "/main/home", icon: <UilEstate /> },
    { name: "Reports", href: "/main/uploadReport", icon: <UilFileGraph /> },
    {
      name: "Communication",
      href: "/main/Communication",
      icon: <UilCommentsAlt />,
    },
    {
      name: "Internships opportunities",
      href: "/main/internships",
      icon: <UilBriefcaseAlt />,
    },
    {
      name: "Track Application Status",
      href: "/main/track",
      icon: <UilUserCheck />,
    },
    { name: "My Tasks", href: "/main/tasks", icon: <UilListUl /> },
  ],
  COMPANY_SUPERVISOR: [
    { name: "Home", href: "/main/home", icon: <UilEstate /> },
    { name: "Reports", href: "/main/reports", icon: <UilFileGraph /> },
    {
      name: "Communication",
      href: "/main/communication",
      icon: <UilCommentsAlt />,
    },
    {
      name: "Student Information",
      href: "/main/studentsinfo",
      icon: <UilUserExclamation />,
    },
    { name: "Assign Task", href: "/main/TaskForm", icon: <UilFilePlusAlt /> },
    {
      name: "Task Progress",
      href: "/main/taskprogress",
      icon: <UilCheckSquare />,
    },
  ],
  FACULTY_SUPERVISOR: [
    { name: "Home", href: "/main/home", icon: <UilEstate /> },
    { name: "Reports", href: "/main/reports", icon: <UilFileGraph /> },
    {
      name: "Communication",
      href: "/main/communication",
      icon: <UilCommentsAlt />,
    },
    {
      name: "Student Information",
      href: "/main/studentsinfo",
      icon: <UilUserExclamation />,
    },
  ],
};

const SideNavBar = () => {
  const { userRole } = useUser();
  const { pathname } = useLocation();
  const navLinks = userRole ? navLinksMap[userRole] || [] : [];

  return (
    <aside className="bg-white border-r border-gray-200 w-60 h-full fixed p-6 shadow-md">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-blue-600">InternLink</h2>
      </div>
      <nav>
        <ul className="space-y-6">
          {navLinks.map((link, index) => {
            const isActive = pathname === link.href;
            return (
              <li key={index}>
                <Link
                  to={link.href}
                  className={`flex items-center text-sm font-medium rounded p-2 transition ${
                    isActive
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600 focus:text-blue-600"
                  }`}
                >
                  {link.icon && (
                    <span className="mr-2">
                      {React.cloneElement(link.icon, {
                        color: isActive ? "#2563EB" : "#6B7280",
                        size: link.icon.props.size || 20, 
                      })}
                    </span>
                  )}
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default SideNavBar;
