import React from "react";
import TopNavBar from "./TopNavBar";
import SideNavBar from "./SideNavBar";
import { Outlet } from "react-router-dom";
import { useUser } from "../context/UserContext";
const LayoutA = () => {
  const { userRole } = useUser();
  console.log("User Role in LayoutA:", userRole);
  return (
    <div className="flex min-h-screen">
      <SideNavBar />
      <div className="flex-1 ml-[240px] pt-[64px]">
        <TopNavBar />
        <main className="px-8 w-full border-red-800">
          <Outlet context={{ userRole }} />
        </main>
      </div>
    </div>
  );
};

export default LayoutA;
