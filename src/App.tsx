import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardHome from "./pages/DashboardHome";
import ItemsListPage from "./pages/ItemListPage";
import ItemFormPage from "./pages/ItemFormPage";
import ItemDetailPage from "./pages/ItemDetailPage";
import EditPage from "./pages/EditPage";
import PublicHome from "./pages/PublicHome";
import Sandbox from "./pages/Sandbox";
import SandboxInput from "./pages/SandboxInput";
import HowToOrder from "./pages/HowToOrder";
import MainInputOrder from "./pages/MainInputOrder";
import Product from "./pages/Product";
import About from "./pages/About";
import Login from "./components/Login/login";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

const App: React.FC = () => {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<PublicHome />} />

      {/* Main Website */}
      <Route path="/about" element={<About />} />
      <Route path="/product" element={<Product />} />
      <Route path="/how-to-order" element={<HowToOrder />} />
      <Route path="/order" element={<MainInputOrder />} />

      {/* For Dashboard */}
      <Route path="/login" element={<Login />} />
      {/* Only Access When Login */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardHome />} />
        <Route path="/items" element={<ItemsListPage />} />
        <Route path="/items/new" element={<ItemFormPage />} />
        <Route path="/items/:id" element={<ItemDetailPage />} />
        <Route path="/items/:id/edit" element={<ItemFormPage />} />
        <Route path="/edit" element={<EditPage />} />
        <Route path="/sandbox" element={<Sandbox />} />
        <Route path="/sandbox-input" element={<SandboxInput />} />
      </Route>

      {/* 404 NOT FOUND */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
