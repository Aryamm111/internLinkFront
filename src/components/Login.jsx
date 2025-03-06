import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext"; // Import UserContext

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useUser(); // Get login function from context

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(username, password, navigate);
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100">
      <div className="relative flex w-3/4 h-3/4 bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Left Side - Hidden on Small Screens */}
        <div className="hidden md:flex md:w-1/2 bg-blue-500 relative">
          <div className="absolute bottom-0 left-0 w-full h-full bg-blue-600 clip-path-wave"></div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-blue-600 text-center">Log in</h2>

          <form className="mt-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-gray-700">Username</label>
              <input
                type="text"
                className="w-full px-4 py-2 mt-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 mt-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Log in
            </button>

            <p className="mt-4 text-center text-gray-600">
              No account?{" "}
              <a href="#" className="text-blue-500 hover:underline">
                Sign up
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
