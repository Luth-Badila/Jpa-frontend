import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardHome from "./pages/Dashboard/DashboardHome";
import ItemsListPage from "./pages/Dashboard/Items/ItemListPage";
import ItemFormPage from "./pages/Dashboard/Items/ItemFormPage";
import ItemDetailPage from "./pages/Dashboard/Items/ItemDetailPage";
import EditPage from "./pages/EditPage";
import PublicHome from "./pages/Public/PublicHome";
import Sandbox from "./pages/Sandbox";
import SandboxInput from "./pages/SandboxInput";
import HowToOrder from "./pages/Public/HowToOrder";
import MainInputOrder from "./pages/MainInputOrder";
import Product from "./pages/Product";
import About from "./pages/Public/About";
import Login from "./pages/AuthService/Login/login";
import NotFound from "./pages/NotFound";
import ProductsListPage from "./pages/Dashboard/Products/ProductsListPage";
import ProtectedRoute from "./components/ProtectedRoute";
import ProductFormPage from "./pages/Dashboard/Products/ProductFormPage";
import ProductDetailPage from "./pages/Dashboard/Products/ProductDetailPage";
import AboutDetailPage from "./pages/Dashboard/AboutSection/AboutDetailPage";
import AboutListPage from "./pages/Dashboard/AboutSection/AboutListPage";
import AboutFormPage from "./pages/Dashboard/AboutSection/AboutFormPage";

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
        {/* Items */}
        <Route path="/dashboard-items" element={<ItemsListPage />} />
        <Route path="/dashboard-items/new" element={<ItemFormPage />} />
        <Route path="/dashboard-items/:id" element={<ItemDetailPage />} />
        <Route path="/dashboard-items/:id/edit" element={<ItemFormPage />} />
        {/* Products */}
        <Route path="/dashboard-products" element={<ProductsListPage />} />
        <Route path="/dashboard-products/new" element={<ProductFormPage />} />
        <Route path="/dashboard-products/:id" element={<ProductDetailPage />} />
        <Route path="/dashboard-products/:id/edit" element={<ProductFormPage />} />
        {/* About */}
        <Route path="/dashboard-about" element={<AboutListPage />} />
        <Route path="/dashboard-about/new" element={<AboutFormPage />} />
        <Route path="/dashboard-about/:id" element={<AboutDetailPage />} />
        <Route path="/dashboard-about/:id/edit" element={<AboutFormPage />} />
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
