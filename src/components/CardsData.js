export const hrManagerCards = [
  {
    title: 'Announcement Management',
    description: 'Manage internship postings by creating, editing, or removing .',
    buttonText: 'Manage',
    onClick: () => console.log('Navigate to Announcement Management'),
  },
  {
    title: 'Applications',
    description: 'Evaluate student applications and accept or reject candidates.',
    buttonText: 'Review',
    onClick: () => console.log('Navigate to Applications'),
  },
  {
    title: 'Assign Supervisor',

    description: `Assign supervisors to students
    `,

    buttonText: 'Assign',
    onClick: () => console.log('Navigate to Assign Supervisor'),
  },
];

export const studentCards = [
  {
    title: 'Reports',
    description: 'Submit and view your internship reports easily.',
    buttonText: 'Submit',
    onClick: () => console.log('Navigate to Reports'),
  },
  {
    title: 'Communication',
    description: 'Connect with your supervisors and peers seamlessly.',
    buttonText: 'Contact',
    onClick: () => console.log('Navigate to Communication'),
  },
  {
    title: 'Internship Opportunities',
    description: 'Explore and apply for the latest internship openings.',
    buttonText: 'Search',
    onClick: () => console.log('Navigate to Internship Opportunities'),
  },
  {
    title: 'Track Application Status',
    description: 'Check the status of your internship applications ',
    buttonText: 'Track',
    onClick: () => console.log('Navigate to Application Status'),
  },
  {
    title: 'My Tasks',
    description: 'View and manage your assigned internship tasks.',
    buttonText: 'View Task',
    onClick: () => console.log('Navigate to My Tasks'),
  },
];

export const companySupervisorCards = [
  {
    title: 'Reports',
    description: 'View and verify submitted reports.',
    buttonText: 'View',
    onClick: () => console.log('Navigate to Reports'),
  },
  {
    title: 'Communication',
    description: 'Connect with students and faculty members.',
    buttonText: 'Contact',
    onClick: () => console.log('Navigate to Communication'),
  },
  {
    title: 'Task Management',
    description: 'Assign tasks for students, and view their progress.',
    buttonText: 'Manage',
    onClick: () => console.log('Navigate to Task Management'),
  },
  {
    title: 'Student Information',
    description: 'Access and review student profiles.',
    buttonText: 'View',
    onClick: () => console.log('Navigate to Student Information'),
  },
];

export const facultySupervisorCards = [
  {
    title: 'Reports',
    description: 'View and verify submitted reports by students.',
    buttonText: 'Verify',
    onClick: () => console.log('Navigate to Reports'),
  },
  {
    title: 'Student Information',
    description: 'Access and review student profiles and performance.',
    buttonText: 'Review',
    onClick: () => console.log('Navigate to Student Information'),
  },
  {
    title: 'Communication',
    description: 'Communicate with students and colleagues seamlessly.',
    buttonText: 'Message',
    onClick: () => console.log('Navigate to Communication'),
  },
];


export const cardsDataMap = {
  HRManager: hrManagerCards,
  STUDENT: studentCards,
  COMPANY_SUPERVIOSR: companySupervisorCards,
  FACULTY_SUPERVISOR: facultySupervisorCards,
};
