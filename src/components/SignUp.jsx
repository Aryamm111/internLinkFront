import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import abstractimg from "../assets/abstractshape.png";
import logoImg from "../assets/Eicon.png";
import circle from "../assets/circle.png";

const SignUp = () => {
  const { registerCompanySupervisor, registerHRManager } = useUser();
  const [userType, setUserType] = useState("HRManager");
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userType === "HRManager") {
      await registerHRManager(formData, navigate);
    } else if (userType === "CompanySupervisor") {
      const payload = { userType, ...formData };
      await registerCompanySupervisor(payload, navigate);
    }
  };

  return (
    <div className="relative min-h-screen">
      <img
        src={abstractimg}
        alt="Abstract Shapes"
        className="fixed top-0 right-0 w-3/4 max-w-screen-lg h-auto object-cover z-0"
      />
      <header className="relative flex justify-between items-center px-6 pt-4 z-10">
        <div className="flex items-center space-x-2">
          <img
            src={logoImg}
            alt="Logo"
            className="h-8 w-8 mb-6 object-contain"
          />
          <h1 className="text-2xl font-bold">INTERNLINK</h1>
        </div>
      </header>

      <div className="absolute -left-20 top-1/4 z-10">
        <img src={circle} alt="Decorative" className="w-80 h-auto opacity-50" />
      </div>

      <main className="flex overflow-visible min-h-screen relative z-10 ml-20 py-10">
        <div className="w-1/2 flex flex-col justify-center rounded-lg shadow p-12 bg-white">
          <h2 className="text-4xl font-volkhov font-bold text-[#181E4B] mb-6">
            Sign Up
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-500 bg-white">
                User Type
              </label>
              <select
                name="userType"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg bg-white"
              >
                <option value="HRManager">HR Manager</option>
                <option value="CompanySupervisor">Company Supervisor</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleInputChange}
                required
                className="bg-white block w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleInputChange}
                required
                className="bg-white block w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleInputChange}
              required
              className="bg-white block w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg"
            />

            <input
              type="text"
              name="companyName"
              placeholder="Company Name"
              onChange={handleInputChange}
              required
              className="bg-white block w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg"
            />

            {userType === "CompanySupervisor" && (
              <input
                type="text"
                name="hrManagerId"
                placeholder="HR Manager ID"
                onChange={handleInputChange}
                required
                className="bg-white block w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg"
              />
            )}

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 mt-6 rounded-lg hover:bg-blue-600"
            >
              Sign Up
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default SignUp;
