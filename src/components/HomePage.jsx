import React from 'react';
import HomePageCard from './HomePageCard';

const HomePage = ({  cardsData = [] }) => {

  return (
    <div >
      <h1 >Home</h1>
      <div className="bg-gray-100 px-8 py-7 rounded-lg w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
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
