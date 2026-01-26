import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../components/layout/Dashboard/DashboardLayout";
import { useParams, useNavigate } from "react-router-dom";
import { getProduct } from "../../../api/products";
import { type Product } from "../../../types";

const ProductDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      const data = await getProduct(Number(id));
      setProduct(data);
    })();
  }, [id]);

  return (
    <DashboardLayout>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Product Detail</h1>
        <button onClick={() => navigate("/dashboard-products")} className="px-3 py-1 bg-gray-200 rounded cursor-pointer">
          Back
        </button>
      </div>

      <div className="bg-white p-6 rounded shadow max-w-2xl">
        {!product ? (
          <div>Loading...</div>
        ) : (
          <div className="min-h-screen flex flex-col">
            {/* Image Section */}
            <div className="w-full h-[50vh] bg-slate-100 flex items-center justify-center">
              <img src={product.image_product} alt={product.name} className="max-w-full max-h-full object-contain" />
            </div>

            {/* Content Section */}
            <div className="flex-1 container mx-auto px-4 py-6">
              <h2 className="text-2xl font-bold mb-2">{product.name}</h2>

              <p className="text-sm text-slate-500">{new Date(product.created_at).toLocaleString()}</p>
              <div className="flex flex-col gap-1 mt-3">
                <p className="text-md text-slate-500">{product.category}</p>
                <p className="text-green-600 font-semibold text-lg">Rp {product.price}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ProductDetailPage;
