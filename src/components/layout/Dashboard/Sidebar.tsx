import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <aside className="w-56 bg-white border-r min-h-screen">
      <div className="p-4 font-bold text-lg">My Dashboard</div>
      <nav className="p-4 space-y-2">
        <NavLink to="/" end className={({isActive}) => isActive ? "block p-2 rounded bg-slate-100" : "block p-2 rounded hover:bg-slate-50"}>Home</NavLink>
        <NavLink to="/items" className={({isActive}) => isActive ? "block p-2 rounded bg-slate-100" : "block p-2 rounded hover:bg-slate-50"}>Items</NavLink>
        <NavLink to="/edit" className={({isActive}) => isActive ? "block p-2 rounded bg-slate-100" : "block p-2 rounded hover:bg-slate-50"}>Edit Site</NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
