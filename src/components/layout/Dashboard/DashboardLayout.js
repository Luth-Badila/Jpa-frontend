import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
const DashboardLayout = ({ children }) => {
    return (_jsxs("div", { className: "min-h-screen flex bg-slate-50", children: [_jsx(Sidebar, {}), _jsxs("div", { className: "flex-1", children: [_jsx(Topbar, {}), _jsx("main", { className: "p-6", children: children })] })] }));
};
export default DashboardLayout;
