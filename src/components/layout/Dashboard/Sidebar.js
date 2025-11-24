import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NavLink } from "react-router-dom";
const Sidebar = () => {
    return (_jsxs("aside", { className: "w-56 bg-white border-r min-h-screen", children: [_jsx("div", { className: "p-4 font-bold text-lg", children: "My Dashboard" }), _jsxs("nav", { className: "p-4 space-y-2", children: [_jsx(NavLink, { to: "/", end: true, className: ({ isActive }) => isActive ? "block p-2 rounded bg-slate-100" : "block p-2 rounded hover:bg-slate-50", children: "Home" }), _jsx(NavLink, { to: "/items", className: ({ isActive }) => isActive ? "block p-2 rounded bg-slate-100" : "block p-2 rounded hover:bg-slate-50", children: "Items" }), _jsx(NavLink, { to: "/edit", className: ({ isActive }) => isActive ? "block p-2 rounded bg-slate-100" : "block p-2 rounded hover:bg-slate-50", children: "Edit Site" })] })] }));
};
export default Sidebar;
