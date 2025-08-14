import React from "react";
import DashboardLayout from "../components/layout/Dashboard/DashboardLayout";

const DashboardHome: React.FC = () => {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-semibold mb-4">Dashboard Home</h1>
      <p>Ringkasan singkat — tambahkan statistik, grafik, dsb.</p>
    </DashboardLayout>
  );
};

export default DashboardHome;
