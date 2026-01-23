import React from "react";
import LogoutButton from "../../../pages/AuthService/Logout";

const Topbar: React.FC = () => {
  return (
    <header className="bg-white border-b p-4 flex items-center justify-between">
      <div className="font-semibold">Dashboard</div>
      <LogoutButton />
    </header>
  );
};

export default Topbar;
