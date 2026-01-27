import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../components/layout/Dashboard/DashboardLayout";
import { useParams, useNavigate } from "react-router-dom";
import { getAbout } from "../../../api/about";
import { type About } from "../../../types";

const AboutDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [about, setAbout] = useState<About | null>(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      const data = await getAbout(Number(id));
      setAbout(data);
    })();
  }, [id]);

  return (
    <DashboardLayout>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Item Detail</h1>
        <button onClick={() => navigate("/dashboard-items")} className="px-3 py-1 bg-gray-200 rounded cursor-pointer">
          Back
        </button>
      </div>

      <div className="bg-white p-6 rounded shadow max-w-2xl">
        {!about ? (
          <div>Loading...</div>
        ) : (
          <div className="min-h-screen flex flex-col">
            {/* Image Section */}
            <div className="w-full h-[50vh] bg-slate-100 flex items-center justify-center">
              <img src={about.image} alt={about.title} className="max-w-full max-h-full object-contain" />
            </div>

            {/* Content Section */}
            <div className="flex-1 container mx-auto px-4 py-6">
              <h2 className="text-2xl font-bold mb-2">{about.title}</h2>

              <p className="text-sm text-slate-500 mb-6">{new Date(about.created_at).toLocaleString()}</p>

              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{
                  __html: about.description ?? "<i>No description</i>",
                }}
              />
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AboutDetailPage;
