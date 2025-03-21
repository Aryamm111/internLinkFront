import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext'; 

const navLinksMap = {
  HR_MANAGER: [
    { name: 'Home', href: '/main/home' },
    { name: 'Announcements', href: '/main/announcements' },
    { name: 'Applications', href: '/main/applications' },
    { name: 'Assign Supervisor', href: '/main/assign-supervisor' },
  ],
  STUDENT: [
    { name: 'Home', href: '/main/home' },
    { name: 'Reports', href: '/main/uploadReport' },
    { name: 'Communication', href: '/main/Communication' },
    { name: 'Internships opportunities', href: '/main/internships' },
    { name: 'Track Application Status', href: '/main/track' },
    { name: 'My Tasks', href: '/main/tasks' },
  ],
  COMPANY_SUPERVISOR: [
    { name: 'Home', href: '/main/home' },
    { name: 'Reports', href: '/main/reports' },
    { name: 'Communication', href: '/main/communication' },
    { name: 'Student Information', href: '/main/studentsinfo' },
    { name: 'Assign Task', href: '/main/TaskForm' },
    { name: 'Task Progress', href: '/main/tasks' },
  ],
  FACULTY_SUPERVISOR: [
    { name: 'Home', href: '/main/home' },
    { name: 'Reports', href: '/main/reports' },
    { name: 'Communication', href: '/main/communication' },
    { name: 'Student Information', href: '/main/studentsinfo' },
  ]
};


const SideNavBar = () => {
  const { userRole } = useUser();

 
  console.log("User Role in SideNavBar:", userRole);

  const navLinks = userRole ? navLinksMap[userRole] || [] : [];

  return (
    <aside className="bg-white border-r border-gray-200 w-60 h-full fixed p-6 shadow-md">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-blue-600">InternLink</h2>
      </div>
      <nav>
        <ul className="space-y-4">
          {navLinks.length === 0 ? (
            <p className="text-gray-500">No navigation items available</p>
          ) : (
            navLinks.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.href}
                  className="block text-gray-700 text-sm font-medium rounded hover:bg-blue-50 hover:text-blue-600 p-2 transition focus:text-blue-600"
                >
                  {link.name}
                </Link>
              </li>
            ))
          )}
        </ul>
      </nav>
    </aside>
  );
};

export default SideNavBar;