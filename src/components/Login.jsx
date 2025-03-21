import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import abstractimg from "../assets/abstractshape.png";
import logoImg from "../assets/Eicon.png";
import circle from "../assets/circle.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useUser();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isForgotPassword) {
      console.log("Password reset link sent to:", email);
    } else {
      await login(email, password, navigate);
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
        <div className="space-x-4">
          <button className="bg-blue-200 text-white px-4 py-2 rounded hover:bg-blue-600">
            Login
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Sign up
          </button>
        </div>
      </header>

      <div className="absolute -left-20 top-1/4 z-0">
        <img src={circle} alt="Decorative" className="w-80 h-auto opacity-50" />
      </div>

      <main className="flex h-screen relative z-10 ml-20">
        <div className="w-1/2 flex flex-col justify-center rounded-lg shadow p-12 bg-white">
          <h2 className="text-4xl font-volkhov font-bold text-[#181E4B] mb-6">
            {isForgotPassword ? "Forgot Password" : "Welcome back"}
          </h2>
          <p className="text-sm text-gray-600 mb-8">
            {isForgotPassword ? (
              "Enter your email to reset your password"
            ) : (
              <>
                Don't have an account?{" "}
                <a href="/signup" className="text-pink-500">
                  Sign up →
                </a>
              </>
            )}
          </p>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-500"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {!isForgotPassword && (
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            )}
            {!isForgotPassword && (
              <div className="mb-4">
                <button
                  type="button"
                  className="text-sm text-pink-300 bg-white hover:underline"
                  onClick={() => setIsForgotPassword(true)}
                >
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              {isForgotPassword ? "Submit" : "Log in"}
            </button>
          </form>
        </div>
        <div className="w-1/2 relative"></div>
      </main>
    </div>
  );
};

export default Login;
