// import React from 'react';
// import randomImage from './random.jpg';

// const InternshipCard = ({ 
//   title, location, major, skills, duration, image = "./random.jpg", status , buttonType = "status" 
// }) => {
  

//   const getButtonDetails = () => {
//     if (buttonType === "status") {
//       switch (status) {
//         case "accepted":
//           return { label: "Accepted", color: "bg-green-500 hover:bg-green-600" };
//         case "rejected":
//           return { label: "Rejected", color: "bg-red-500 hover:bg-red-600" };
//         case "pending":
//         default:
//           return { label: "Pending", color: "bg-gray-500 hover:bg-gray-600" };
//       }
//     } else if (buttonType === "action") {
//       return { label: "Apply", color: "bg-blue-500 hover:bg-blue-600" };
//     }
//   };

//   const { label, color } = getButtonDetails();

//   return (
//     <div className="max-w-3xl mx-auto pt-3 ">
//       <div className="flex bg-white shadow-lg rounded-lg p-6 border-4 border-pink-100  border-opacity-25">
//         <img 
//           src={randomImage} 
//           alt="Internship logo"
//           className="w-16 h-16 rounded-lg  mr-6" 
//         />
//         <div className="flex-1 mr-20 ">
//           <h1 className="text-xl font-bold text-gray-800">{title}</h1>
//           <p className="text-sm text-gray-600">Location: {location}</p>
//           <p className="text-sm text-gray-600">Major: {major}</p>
//           <p className="text-sm text-gray-600">Skills: {skills}</p>
//           <p className="text-sm text-gray-600">Duration: {duration}</p>
//         </div>
//         <div className="mt-auto">
//           <button className={`${color} text-white rounded-xl py-2 px-4`}>
//             {label}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InternshipCard;
