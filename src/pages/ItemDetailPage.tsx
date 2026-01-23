import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/Dashboard/DashboardLayout";
import { useParams, useNavigate } from "react-router-dom";
import { getItem } from "../api/items";
import { type Item } from "../types";

const ItemDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState<Item | null>(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      const data = await getItem(Number(id));
      setItem(data);
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
        {!item ? (
          <div>Loading...</div>
        ) : (
          <div className="min-h-screen flex flex-col">
            {/* Image Section */}
            <div className="w-full h-[50vh] bg-slate-100 flex items-center justify-center">
              <img src={item.image} alt={item.title} className="max-w-full max-h-full object-contain" />
            </div>

            {/* Content Section */}
            <div className="flex-1 container mx-auto px-4 py-6">
              <h2 className="text-2xl font-bold mb-2">{item.title}</h2>

              <p className="text-sm text-slate-500 mb-6">{new Date(item.created_at).toLocaleString()}</p>

              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{
                  __html: item.description ?? "<i>No description</i>",
                }}
              />
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ItemDetailPage;
