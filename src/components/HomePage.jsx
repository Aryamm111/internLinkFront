import React from "react";
import HomePageCard from "./HomePageCard";
import { useUser } from "../context/UserContext.jsx"; // Import the context hook

import {
  hrManagerCards,
  studentCards,
  companySupervisorCards,
  facultySupervisorCards,
} from "./CardsData.js";

const cardsDataMap = {
  HR_MANAGER: hrManagerCards,
  STUDENT: studentCards,
  COMPANY_SUPERVISOR: companySupervisorCards,
  FACULTY_SUPERVISOR: facultySupervisorCards,
};

const HomePage = () => {
  const { userRole } = useUser();

  const cardsData = cardsDataMap[userRole] || [];
  const getDynamicGridStyles = (cards) => {
    if (cards.length === 5) {
      return "grid grid-cols-2 gap-4";
    } else if (cards.length === 4) {
      return "grid grid-cols-2 gap-4";
    } else if (cards.length === 3) {
      return "grid grid-cols-1 sm:grid-cols-3 gap-4";
    } else {
      return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4";
    }
  };

  const renderCards = (cards) => {
    if (cards.length === 5) {
      return (
        <>
          <div className="grid grid-cols-2 gap-4">
            {cards.slice(0, 2).map((card, index) => (
              <HomePageCard
                key={index}
                title={card.title}
                description={card.description}
                buttonText={card.buttonText}
                onClick={card.onClick}
              />
            ))}
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {cards.slice(2).map((card, index) => (
              <HomePageCard
                key={index + 2}
                title={card.title}
                description={card.description}
                buttonText={card.buttonText}
                onClick={card.onClick}
              />
            ))}
          </div>
        </>
      );
    }

    return (
      <div className={getDynamicGridStyles(cards)}>
        {cards.map((card, index) => (
          <HomePageCard
            key={index}
            title={card.title}
            description={card.description}
            buttonText={card.buttonText}
            onClick={card.onClick}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white bg-opacity-10  px-7 pt-5">
      <h1>Home</h1>

      <div className="bg-[#F5F5F5] px-8 py-8   rounded-lg ">
        {renderCards(cardsData)}
      </div>
    </div>
  );
};

export default HomePage;
