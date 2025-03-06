import React from 'react';
import HomePageCard from './HomePageCard';
import { useUser } from '../context/UserContext.jsx';  // Import the context hook


import { hrManagerCards, studentCards, companySupervisorCards, facultySupervisorCards } from "./CardsData.js"; 


const cardsDataMap = {
  HRMANAGER: hrManagerCards,
  STUDENT: studentCards,
  COMPANY_SUPERVISOR: companySupervisorCards,
  FACULTY_SUPERVISOR: facultySupervisorCards,
};

const HomePage = () => {
  const { userRole } = useUser(); 

  const cardsData = cardsDataMap[userRole] || [];

  return (
    <div className="bg-red px-7 pt-9 ">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Home</h1>
      <div className="bg-gray-100 px-8 py-10 rounded-lg z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cardsData.map((card, index) => (
            <HomePageCard
              key={index}
              title={card.title}
              description={card.description}
              buttonText={card.buttonText}
              onClick={card.onClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
