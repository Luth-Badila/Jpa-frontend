import React from "react";
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

const App: React.FC = () => {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<PublicHome />} />

      {/* Dashboard */}
      <Route path="/dashboard" element={<DashboardHome />} />
      <Route path="/items" element={<ItemsListPage />} />
      <Route path="/items/new" element={<ItemFormPage />} />
      <Route path="/items/:id" element={<ItemDetailPage />} />
      <Route path="/items/:id/edit" element={<ItemFormPage />} />
      <Route path="/edit" element={<EditPage />} />
      <Route path="/how-to-order" element={<OrderPage />} />
      <Route path="/order" element={<OrderPage />} />

      <Route path="/sandbox" element={<Sandbox />} />
      <Route path="/sandbox-input" element={<SandboxInput />} />
      <Route path="/sandbox2" element={<Sandbox2 />} />
    </Routes>
  );
};

export default App;
