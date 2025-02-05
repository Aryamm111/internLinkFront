import React from 'react';

const HomePageCard = ({ title, description, buttonText, onClick }) => {
  return (
    <div className="bg-white  shadow-lg rounded-lg p-6 max-w-xs hover:shadow-xl flex flex-col  mt-6 mx-auto">
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
      </div>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300  mt-4"
        onClick={onClick}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default HomePageCard;
