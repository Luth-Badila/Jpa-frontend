import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../../../pages/AuthService/Logout";

const Topbar: React.FC<{
  open: boolean;
  setOpen: (v: boolean) => void;
}> = ({ open, setOpen }) => {
  return (
    <header className="bg-white border-b p-4 flex items-center justify-between">
      <div className="flex items-center gap-5">
        {/* Hamburger */}
        <button onClick={() => setOpen(!open)} className="md:hidden relative w-8 h-8 cursor-pointer">
          <span className={`absolute h-0.5 w-6 bg-slate-800 transition-all duration-300 ${open ? "rotate-45 top-3.5" : "top-2"}`} />
          <span className={`absolute h-0.5 w-6 bg-slate-800 transition-all duration-300 ${open ? "opacity-0" : "top-3.5"}`} />
          <span className={`absolute h-0.5 w-6 bg-slate-800 transition-all duration-300 ${open ? "-rotate-45 top-3.5" : "top-5"}`} />
        </button>
        <NavLink to="/dashboard">
          <div className="font-semibold text-lg mb-1">Dashboard</div>
        </NavLink>
      </div>

      <LogoutButton />
    </header>
  );
};

export default Topbar;
