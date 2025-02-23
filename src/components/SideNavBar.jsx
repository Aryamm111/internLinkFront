import React from 'react';
import { Link } from 'react-router-dom'; 
import { useUser } from '../UseContext';
const navLinksMap = {

  student: [
    { name: 'Home' ,href : '/home'},
    { name: 'Reports',href : '/reports' },
    { name: 'Communication',href:'/communication' },
    { name: 'Internships opportunities',href:'/opportunities' },
    { name: 'Track Application Status',href:'/track' },
    { name: 'My Tasks'},
  ],
  companySupervisor: [
    { name: 'Home' ,href : '/home'},
    { name: 'Reports', href:'/reports'},
    { name: 'Communication' },
    { name: 'Student Information',href:'/studentsinfo' },
    { name: 'Assign Task', href:'/TaskForm'},
    { name: 'Task Progress'},

  ],
  facultySupervisor: [
    { name: 'Home' ,href : '/home'},
    { name: 'Reports' , href:'/reports'},
    { name: 'Communication' },
    { name: 'Student Information',href:'/studentsinfo' },
   

  ],
};

const SideNavBar = () => {

    const { userRole } = useUser(); 
  const navLinks = navLinksMap[userRole] || [];

  return (
    <aside className="bg-white border-r border-gray-200 w-60 h-full fixed p-5 shadow-md">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-blue-600">InternLink</h2>
      </div>
      <nav>
        <ul className="space-y-4">
          {navLinks.map((link, index) => (
            <li key={index}>
              <Link
                to={link.href}
                className="block text-gray-700 text-sm font-medium rounded hover:bg-blue-50 hover:text-blue-600 p-2 focus:text-blue-600"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default SideNavBar;
