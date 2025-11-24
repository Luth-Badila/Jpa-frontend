import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route } from "react-router-dom";
import DashboardHome from "./pages/DashboardHome";
import ItemsListPage from "./pages/ItemListPage";
import ItemFormPage from "./pages/ItemFormPage";
import ItemDetailPage from "./pages/ItemDetailPage";
import EditPage from "./pages/EditPage";
import PublicHome from "./pages/PublicHome";
import OrderPage from "./pages/OrderPage";
import Sandbox from "./pages/Sandbox";
import SandboxInput from "./pages/SandboxInput";
import Sandbox2 from "./pages/Sandbox2";
import HowToOrder from "./pages/HowToOrder";
const App = () => {
    return (_jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(PublicHome, {}) }), _jsx(Route, { path: "/dashboard", element: _jsx(DashboardHome, {}) }), _jsx(Route, { path: "/about", element: _jsx(DashboardHome, {}) }), _jsx(Route, { path: "/contact", element: _jsx(DashboardHome, {}) }), _jsx(Route, { path: "/product", element: _jsx(DashboardHome, {}) }), _jsx(Route, { path: "/how-to-order", element: _jsx(HowToOrder, {}) }), _jsx(Route, { path: "/items", element: _jsx(ItemsListPage, {}) }), _jsx(Route, { path: "/items/new", element: _jsx(ItemFormPage, {}) }), _jsx(Route, { path: "/items/:id", element: _jsx(ItemDetailPage, {}) }), _jsx(Route, { path: "/items/:id/edit", element: _jsx(ItemFormPage, {}) }), _jsx(Route, { path: "/edit", element: _jsx(EditPage, {}) }), _jsx(Route, { path: "/order", element: _jsx(OrderPage, {}) }), _jsx(Route, { path: "/sandbox", element: _jsx(Sandbox, {}) }), _jsx(Route, { path: "/sandbox-input", element: _jsx(SandboxInput, {}) }), _jsx(Route, { path: "/sandbox2", element: _jsx(Sandbox2, {}) })] }));
};
export default App;
