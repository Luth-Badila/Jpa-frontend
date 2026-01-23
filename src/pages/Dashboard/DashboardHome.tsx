import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "../../lib/supabaseClient";
import DashboardLayout from "../../components/layout/Dashboard/DashboardLayout";

const DashboardHome = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
      setLoading(false);
    };

    getUser();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <p>Loading...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-semibold mb-4">Dashboard Home</h1>

      <p className="mb-2">
        Selamat datang, <span className="font-semibold">{user?.email}</span>
      </p>

      <p>Ringkasan singkat — tambahkan statistik, grafik, dsb.</p>
    </DashboardLayout>
  );
};

export default DashboardHome;
