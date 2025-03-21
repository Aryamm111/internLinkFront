import React from "react";
import abstractimg from "../assets/abstractshape.png";
import work from "../assets/work.png";
import logoImg from "../assets/Eicon.png";
import progress from "../assets/progress.png";
import connect from "../assets/connect.png";
import match from "../assets/matching.png";
import { Link } from "react-router-dom";
const MainPage = () => {
  return (
    <div className="relative min-h-screen">
      <img
        src={abstractimg}
        alt="Abstract Shapes"
        className="fixed top-0 right-0 w-3/4 max-w-screen-lg h-auto object-cover z-0"
      />

      <header className="relative flex justify-between items-center px-6 pt-4 z-10 b-0">
        <div className="flex items-center space-x-2">
          <img
            src={logoImg}
            alt="Logo"
            className="h-8 w-8 mb-6 object-contain"
          />
          <h1 className="text-2xl font-bold">INTERNLINK</h1>
        </div>
        <div className="space-x-4">
          <Link
            to="/login"
            className="bg-blue-200 text-white px-4 py-2 rounded hover:bg-blue-600 hover:text-white"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-blue-200 text-white px-4 py-2 rounded hover:bg-blue-600 hover:text-white"
          >
            Sign up
          </Link>
        </div>
      </header>

      <main className="relative z-10  mt-20">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex-1 space-y-12 ml-12">
            <h2 className="text-5xl font-bold leading-tight font-volkhov text-[#181E4B]">
              Connect.
              <br />
              <span className="ml-2">Grow</span>
              <span className="relative ml-2">
                Succeed.
                <span
                  className="absolute bottom-0 left-0 w-full h-1 bg-pink-300"
                  style={{ transform: "translateY(5px)" }}
                ></span>
              </span>
            </h2>
            <p className="text-gray-600">
              Connecting talent with opportunity. Explore internships, announce
              opportunities, and track progress—all in one seamless and
              collaborative platform.
            </p>
            <button className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600">
              SIGN UP
            </button>
          </div>

          <div className="relative flex-1">
            <img
              src={work}
              alt="Girl working on a laptop"
              className="relative z-10 max-w-full mx-auto -mb-12"
            />
          </div>
        </div>

        <section className="relative w-full bg-white py-20">
          <div className="max-w-7xl mx-auto px-8">
            <h2 className="text-4xl font-bold text-[#181E4B] text-center mb-20 mt-20">
              Discover More Features
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 mt-20 mb-20 gap-16">
              <div className="group bg-white h-80 p-6 rounded-xl shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-pink-200 hover:shadow-lg">
                <img
                  src={match}
                  alt="Decorative Image"
                  className="mx-auto mb-4 w-16 h-16 object-contain group-hover:-translate-y-2 transition-transform duration-300"
                />

                <h3 className="text-2xl font-volkhov font-bold text-[#181E4B] mb-4 text-center">
                  Internship Matching
                </h3>
                <p className="text-gray-600 text-center">
                  Our system connects students with the best internship
                  opportunities based on their profile.
                </p>
              </div>

              <div className="group bg-white h-80 p-6 rounded-xl shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-pink-200 hover:shadow-lg">
                <img
                  src={progress}
                  alt="Decorative Image"
                  className="mx-auto mb-4 w-16 h-16 object-contain group-hover:-translate-y-2 transition-transform duration-300"
                />
                <h3 className="text-2xl font-volkhov font-bold text-[#181E4B] mb-4 text-center">
                  Progress Tracking
                </h3>
                <p className="text-gray-600 text-center">
                  Supervisors can monitor students' progress and review
                  submitted reports throughout the internship.
                </p>
              </div>

              <div className="group bg-white h-80 p-6 rounded-xl shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-pink-200 hover:shadow-lg">
                <img
                  src={connect}
                  alt="Decorative Image"
                  className="mx-auto mb-4 w-16 h-16 object-contain group-hover:-translate-y-2 transition-transform duration-300"
                />
                <h3 className="text-2xl font-volkhov font-bold text-[#181E4B] mb-4 text-center">
                  Seamless Communication
                </h3>
                <p className="text-gray-600 text-center">
                  Students, faculty, and company supervisors can interact
                  effortlessly through built-in messaging and notifications.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default MainPage;
