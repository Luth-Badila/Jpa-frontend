import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../components/layout/Dashboard/DashboardLayout";
import { useParams, useNavigate } from "react-router-dom";
import { getOrder } from "../../../api/order";
import { type Order } from "../../../types";

const OrderDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      const data = await getOrder(Number(id));
      setOrder(data);
    })();
  }, [id]);

  return (
    <DashboardLayout>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Order Detail</h1>
        <button onClick={() => navigate("/dashboard-order")} className="px-3 py-1 bg-gray-200 rounded cursor-pointer">
          Back
        </button>
      </div>

      <div className="bg-white p-6 rounded shadow max-w-2xl">
        {!order ? (
          <div>Loading...</div>
        ) : (
          <div className="min-h-screen flex flex-col">
            {/* Image Section */}
            <div className="w-full h-[50vh] bg-slate-100 flex items-center justify-center">
              <img src={order.overlay_url} alt={order.buyer_name} className="max-w-full max-h-full object-contain" />
            </div>
            {/* Image Section */}
            <div className="w-full h-[50vh] bg-slate-100 flex items-center justify-center">
              <img src={order.preview_url} alt={order.buyer_name} className="max-w-full max-h-full object-contain" />
            </div>

            {/* Content Section */}
            <div className="flex-1 container mx-auto px-4 py-6">
              <h2 className="text-2xl font-bold mb-2">{order.buyer_name}</h2>
              <p className="text-xl font-bold mb-2">{order.price}</p>

              <p className="text-sm text-slate-500 mb-6">{new Date(order.created_at).toLocaleString()}</p>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default OrderDetailPage;
