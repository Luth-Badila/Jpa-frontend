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
import Product from "./components/layout/Product/Product";
import About from "./pages/About";
import Contact from "./pages/Contact";

const App: React.FC = () => {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<PublicHome />} />

      {/* Main Website */}
      <Route path="/dashboard" element={<DashboardHome />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/product" element={<Product />} />
      <Route path="/how-to-order" element={<HowToOrder />} />

      {/* Fpr Dashboard */}
      <Route path="/items" element={<ItemsListPage />} />
      <Route path="/items/new" element={<ItemFormPage />} />
      <Route path="/items/:id" element={<ItemDetailPage />} />
      <Route path="/items/:id/edit" element={<ItemFormPage />} />
      <Route path="/edit" element={<EditPage />} />
      {/* <Route path="/order" element={<OrderPage />} /> */}
      <Route path="/order" element={<MainInputOrder />} />

      <Route path="/sandbox" element={<Sandbox />} />
      <Route path="/sandbox-input" element={<SandboxInput />} />
    </Routes>
  );
};

export default App;
