import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext'; 

const navLinksMap = {
  HR_MANAGER: [
    { name: 'Home', href: '/home' },
    { name: 'Announcements', href: '/announcements' },
    { name: 'Applications', href: '/applications' },
    { name: 'Assign Supervisor', href: '/assign-supervisor' },
  ],
  STUDENT: [
    { name: 'Home', href: '/home' },
    { name: 'Reports', href: '/uploadReport' },
    { name: 'Communication', href: '/Communication' },
    { name: 'Internships opportunities', href: '/internships' },
    { name: 'Track Application Status', href: '/track' },
    { name: 'My Tasks', href: '/tasks' },
  ],
  COMPANY_SUPERVISOR: [
    { name: 'Home', href: '/home' },
    { name: 'Reports', href: '/reports' },
    { name: 'Communication', href: '/communication' },
    { name: 'Student Information', href: '/studentsinfo' },
    { name: 'Assign Task', href: '/TaskForm' },
    { name: 'Task Progress', href: '/tasks' },
  ],
  FACULTY_SUPERVISOR: [
    { name: 'Home', href: '/home' },
    { name: 'Reports', href: '/reports' },
    { name: 'Communication', href: '/communication' },
    { name: 'Student Information', href: '/studentsinfo' },
  ],
};


const SideNavBar = () => {
  const { userRole } = useUser();

  // Debugging logs
  console.log("User Role in SideNavBar:", userRole);

  // Get the navigation links based on the user role
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