import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar: React.FC<{
  open: boolean;
  setOpen: (v: boolean) => void;
}> = ({ open, setOpen }) => {
  return (
    <aside
      className={`
        fixed md:static z-40
        w-56 bg-white border-r min-h-screen
        transform transition-transform duration-300 mt-18 lg:mt-0
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}
    >
      <div className="hidden md:block py-5.5 px-4 font-bold text-lg border-b">My Dashboard</div>

      <nav className="py-5.5 space-y-2">
        {[
          { to: "/dashboard-items", label: "Items", end: true },
          { to: "/dashboard-products", label: "Products" },
          { to: "/dashboard-about", label: "About" },
          { to: "/dashboard-order", label: "Order" },
        ].map((item) => (
          <NavLink key={item.to} to={item.to} end={item.end} onClick={() => setOpen(false)} className={({ isActive }) => `block p-2 rounded transition ${isActive ? "bg-slate-100 font-medium" : "hover:bg-slate-50"}`}>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
