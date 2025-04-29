import React from "react";
import TopNavBar from "./TopNavBar";
import SideNavBar from "./SideNavBar";
import { Outlet } from "react-router-dom";
import { useUser } from "../context/UserContext";
import imageSrc from "../assets/bg2.png";

const LayoutA = () => {
  const { userRole } = useUser();

  return (
    <div className="flex min-h-screen relative ">
      <SideNavBar />
      <div className="flex-1 ml-[240px] pt-[64px] z-50">
        <TopNavBar />
        <main
          className="px-8 w-full border-red-800 relative bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(${imageSrc})`,
          }}
        >
          <Outlet context={{ userRole }} />
        </main>
      </div>
    </div>
  );
};

export default LayoutA;
