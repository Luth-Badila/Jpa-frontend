// import { useEffect, useState } from "react";
// import { supabase } from "../../../api/supabaseClient";
// import { Product } from "../../../types";

// export default function SearchProduct() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [categories, setCategories] = useState<string[]>([]);
//   const [search, setSearch] = useState<string>("");
//   const [category, setCategory] = useState<string>("");
//   const [minPrice, setMinPrice] = useState<string>("");
//   const [maxPrice, setMaxPrice] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(false);

//   // Load initial products & categories
//   useEffect(() => {
//     fetchCategories();
//     fetchProducts();
//   }, []);

//   // Fetch UNIQUE categories from Supabase
//   const fetchCategories = async () => {
//     const { data, error } = await supabase.from("products").select("category");

//     if (error) {
//       console.error("Category Error:", error);
//       return;
//     }

//     // Ambil kategori unik
//     const uniqueCategories = Array.from(new Set(data.map((item) => item.category)));

//     setCategories(uniqueCategories);
//   };

//   const fetchProducts = async () => {
//     setLoading(true);

//     let query = supabase.from("products").select("*");

//     if (search) {
//       query = query.ilike("name", `%${search}%`);
//     }

//     if (category) {
//       query = query.eq("category", category);
//     }

//     if (minPrice) {
//       query = query.gte("price", Number(minPrice));
//     }

//     if (maxPrice) {
//       query = query.lte("price", Number(maxPrice));
//     }

//     const { data, error } = await query;

//     if (error) {
//       console.error("Supabase Error:", error);
//     } else if (data) {
//       setProducts(data as Product[]);
//     }

//     setLoading(false);
//   };

import { useEffect, useState, useCallback } from "react";
import { supabase } from "../../../api/supabaseClient";
import { Product } from "../../../types";

export default function SearchProduct() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // ✅ FIX: Wrap with useCallback
  const fetchCategories = useCallback(async () => {
    const { data, error } = await supabase.from("products").select("category");

    if (error) {
      console.error("Category Error:", error);
      return;
    }

    const uniqueCategories = Array.from(new Set(data.map((item) => item.category)));
    setCategories(uniqueCategories);
  }, []);

  // ✅ FIX: Wrap with useCallback
  const fetchProducts = useCallback(async () => {
    setLoading(true);

    let query = supabase.from("products").select("*");

    if (search) query = query.ilike("name", `%${search}%`);
    if (category) query = query.eq("category", category);
    if (minPrice) query = query.gte("price", Number(minPrice));
    if (maxPrice) query = query.lte("price", Number(maxPrice));

    const { data, error } = await query;

    if (error) {
      console.error("Supabase Error:", error);
    } else if (data) {
      setProducts(data as Product[]);
    }

    setLoading(false);
  }, [search, category, minPrice, maxPrice]);

  // 🔥 FIX WARNING
  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [fetchCategories, fetchProducts]);

  return (
    <div className="p-5 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-5 text-center">Search Product</h1>

      {/* FORM FILTER */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-5">
        <input type="text" placeholder="Search product..." className="border p-2 rounded-lg" value={search} onChange={(e) => setSearch(e.target.value)} />

        {/* Dropdown category dari database */}
        <select className="border p-2 rounded-lg" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input type="number" placeholder="Min price" className="border p-2 rounded-lg" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />

        <input type="number" placeholder="Max price" className="border p-2 rounded-lg" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
      </div>

      <button onClick={fetchProducts} className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-5 py-2 rounded w-full md:w-auto cursor-pointer">
        Search
      </button>

      {/* LIST PRODUCT */}
      {/* <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500">No products found</p>
        ) : (
          products.map((p) => (
            <div key={p.id} className="border p-4 rounded-lg shadow hover:shadow-lg transition">
              <img src={p.image_product} alt={p.name} />
              <h2 className="font-bold text-xl">{p.name}</h2>
              <p className="text-gray-600">{p.category}</p>
              <p className="text-zinc-600 font-semibold">Rp {p.price.toLocaleString("id-ID")}</p>
            </div>
          ))
        )}
      </div> */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {loading ? (
          // SKELETON LOADING
          [...Array(6)].map((_, i) => (
            <div key={i} className="border p-4 rounded-lg shadow animate-pulse bg-white">
              {/* Skeleton image */}
              <div className="w-full h-40 bg-gray-300 rounded-md"></div>

              {/* title */}
              <div className="h-5 bg-gray-300 rounded mt-4 w-3/4"></div>

              {/* category */}
              <div className="h-4 bg-gray-200 rounded mt-2 w-1/2"></div>

              {/* price */}
              <div className="h-5 bg-gray-300 rounded mt-3 w-1/3"></div>
            </div>
          ))
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">No products found</p>
        ) : (
          products.map((p) => (
            <div key={p.id} className="border p-4 rounded-lg shadow bg-white hover:shadow-xl transition transform hover:-translate-y-1">
              <img src={p.image_product} alt={p.name} className="w-full h-48 object-cover rounded-md mb-4" />

              <h2 className="font-bold text-lg text-gray-800">{p.name}</h2>
              <p className="text-gray-500 text-sm mt-1">{p.category}</p>

              <p className="text-green-600 font-semibold text-lg mt-2">Rp {p.price.toLocaleString("id-ID")}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
