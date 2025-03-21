import React from "react";

const HomePageCard = ({ title, description, buttonText, onClick }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl flex flex-col">
      <h3 className="text-lg font-semibold text-gray-800 mb-5">{title}</h3>

      <p className="text-gray-600 mb-6 whitespace-pre-wrap">{description}</p>
      <button
        className="bg-blue-500 text-white mt-4 py-2 px-4 rounded-lg hover:bg-blue-600"
        onClick={onClick}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default HomePageCard;
