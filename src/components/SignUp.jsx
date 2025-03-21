import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import abstractimg from "../assets/abstractshape.png";
import logoImg from "../assets/Eicon.png";
import circle from "../assets/circle.png";

const SignUp = () => {
  const { handleSignUp } = useUser();
  const [userType, setUserType] = useState("Student");
  const [formData, setFormData] = useState({});
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSkillInput = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (skills.length < 5) {
        const newSkills = skillInput
          .split(/[, ]+/)
          .map((skill) => skill.trim())
          .filter((skill) => skill !== "" && !skills.includes(skill));
        setSkills([...skills, ...newSkills].slice(0, 5));
        setSkillInput("");
      }
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload =
      userType === "Student"
        ? { userType, ...formData, skills }
        : { userType, ...formData };
    await handleSignUp(payload, skills, navigate);
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
            {" "}
            Sign Up{" "}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block bg-white text-sm font-medium text-gray-500">
                {" "}
                User Type{" "}
              </label>
              <select
                name="userType"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg bg-white"
              >
                <option value="Student">Student</option>
                <option value="FacultySupervisor">Faculty Supervisor</option>
                <option value="CompanySupervisor">Company Supervisor</option>
                <option value="HRManager">HR Manager</option>
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
            {userType !== "HRManager" && (
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                onChange={handleInputChange}
                required
                className="bg-white block w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg"
              />
            )}
            {userType === "Student" && (
              <>
                <input
                  type="text"
                  name="studentId"
                  placeholder="Student ID"
                  onChange={handleInputChange}
                  required
                  className="bg-white block w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  name="major"
                  placeholder="Major"
                  onChange={handleInputChange}
                  required
                  className="bg-white block w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg"
                />
                <div className="block w-full mt-4">
                  <label className="text-gray-500 text-sm mb-2 block">
                    {" "}
                    Skills{" "}
                  </label>
                  <div className="flex items-center bg-white flex-wrap px-2 py-2 border border-gray-300 rounded-lg">
                    {skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 border border-gray-300 px-2 py-1 rounded-lg flex items-center text-xs mr-1 mb-1"
                      >
                        {skill}
                        <button
                          onClick={() => handleRemoveSkill(skill)}
                          className="ml-1 text-gray-500 hover:text-pink-300"
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                    <input
                      type="text"
                      placeholder="Press Enter to add, max 5 skills"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={handleSkillInput}
                      className="flex-grow bg-white focus:outline-none"
                    />
                  </div>
                </div>
              </>
            )}
            {userType === "HRManager" && (
              <input
                type="text"
                name="companyName"
                placeholder="Company Name"
                onChange={handleInputChange}
                required
                className="bg-white block w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg"
              />
            )}
            {(userType === "FacultySupervisor" ||
              userType === "CompanySupervisor") && (
              <input
                type="text"
                name="department"
                placeholder="Department"
                onChange={handleInputChange}
                required
                className="bg-white block w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg"
              />
            )}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 mt-6 rounded-lg hover:bg-blue-600"
            >
              {" "}
              Sign Up{" "}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default SignUp;
