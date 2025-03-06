
import React from 'react';
import InternshipsCards from './InternshipCard.jsx';
import internshipsData from './CardsInternship.js';

const ApplicationStatus = () => {
  return (
    <div className='m-10 '>
      <h1  className="text-3xl font-bold text-gray-800 mb-6 ">My Application Status</h1>
<div className="bg-gray-100 p-6 w-full  rounded-lg">
    <div className="space-y-2 w-full">
      {internshipsData.map((card, index) => (
        <InternshipsCards
          key={index}
          title={card.title}
          location={card.location}
          major={card.major || ''}
          skills={card.skills || ''}
          duration={card.dates}
          status={card.Status}
        >
          <p >{card.description}</p>
          <button
            onClick={card.onClick}
           
          >
            {card.buttonText}
          </button>
        </InternshipsCards>
      ))}
    </div>
  </div>
    </div>
  );
};

export default ApplicationStatus;
