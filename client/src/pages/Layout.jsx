import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { assets } from "../assets/assets";
import { Menu, X } from "lucide-react";

const Layout = () => {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);

  return (
    <div className="flex h-screen w-full">
      <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
      <div className="flex-1 flex flex-col">
        <nav className="flex items-center justify-between w-full p-4 shadow-md">
          <img
            src={assets.logo}
            alt="Quick AI Logo"
            className="w-32 h-auto cursor-pointer"
            onClick={() => navigate("/")}
          />
          <button
            className="sm:hidden"
            onClick={() => setSidebar(!sidebar)}
            aria-label="Toggle menu"
          >
            {sidebar ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </nav>

        <div className="flex-1 bg-[#F4F7FB] overflow-y-scroll p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
