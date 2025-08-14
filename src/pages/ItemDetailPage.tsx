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
        <button onClick={() => navigate("/items")} className="px-3 py-1 bg-gray-200 rounded">
          Back
        </button>
      </div>

      <div className="bg-white p-6 rounded shadow max-w-2xl">
        {!item ? (
          <div>Loading...</div>
        ) : (
          <>
            <h2 className="text-xl font-bold">{item.title}</h2>
            <p className="text-sm text-slate-500 mb-4">{new Date(item.created_at).toLocaleString()}</p>
            <div className="prose" dangerouslySetInnerHTML={{ __html: item.description ?? "<i>No description</i>" }} />
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ItemDetailPage;
