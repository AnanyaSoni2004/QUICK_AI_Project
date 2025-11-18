import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { AuthContext } from "../Contexts/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="fixed z-5 w-full backdrop-blur-2xl flex justify-between items-center py-3 px-4 sm:px-20 xl:px-32">
      <img
        src={assets.logo}
        alt="logo"
        className="w-32 sm:w-44 cursor-pointer"
        onClick={() => navigate("/")}
      />

      {user ? (
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">Hi, {user.name || user.email}</span>

          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-red-500 text-white px-6 py-2.5"
          >
            Logout
          </button>
        </div>
      ) : (
        // <button
        //   onClick={() => navigate("/signup")}
        //   className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5"
        // >
        //   Get Started
        //   <ArrowRight className="w-4 h-4" />
        // </button>
        <button
  className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5"
  onClick={() => navigate('/signup')}
>
  Get Started
  <ArrowRight className="w-4 h-4" />
</button>

      )}
    </div>
  );
};

export default Navbar;
