import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../../components/layout/Dashboard/DashboardLayout";
import { getOrders, deleteOrder } from "../../../api/order";
import { useFetch } from "../../../hooks/useFetch";
import { type Order } from "../../../types";

const OrderListPage: React.FC = () => {
  const navigate = useNavigate();
  const { data, loading, error, setData } = useFetch<Order[]>(getOrders, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus item ini?")) return;

    try {
      await deleteOrder(id);

      setData?.((prev) => (prev ? prev.filter((item) => item.id !== id) : prev));

      alert("Item berhasil dihapus");
    } catch (err) {
      alert("Gagal menghapus item (cek login / policy)");
      console.error(err);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Items</h1>
        <div>
          <button onClick={() => navigate("/dashboard-order/new")} className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer">
            Create
          </button>
        </div>
      </div>

      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">Error: {error.message}</div>}

      <div className="bg-white shadow rounded overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Title</th>
              <th className="p-3">Created At</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="p-3">{item.id}</td>
                  <td className="p-3">{item.buyer_name}</td>
                  <td className="p-3">{new Date(item.created_at).toLocaleString()}</td>
                  <td className="p-3">
                    <button
                      onClick={() => navigate(`/dashboard-order/${item.id}`)}
                      className="mr-2 text-white cursor-pointer 
                    bg-green-600 py-1 px-2 rounded-md"
                    >
                      View
                    </button>
                    <button
                      onClick={() => navigate(`/dashboard-items/${item.id}/edit`)}
                      className="mr-2 text-white cursor-pointer 
                    bg-yellow-400 py-1 px-2 rounded-md"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="mr-2 text-white cursor-pointer 
                    bg-red-600 py-1 px-2 rounded-md"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-4">
                  No items
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default OrderListPage;
