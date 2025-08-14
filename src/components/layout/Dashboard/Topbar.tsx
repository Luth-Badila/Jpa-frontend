import React from "react";

const Topbar: React.FC = () => {
  return (
    <header className="bg-white border-b p-4 flex items-center justify-between">
      <div className="font-semibold">Dashboard</div>
      <div className="text-sm text-slate-500">Simple CRUD connected to Supabase</div>
    </header>
  );
};

export default Topbar;
