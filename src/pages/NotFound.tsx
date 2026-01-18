// src/pages/NotFound.tsx
import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 via-lime-300 to-yellow-300 px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full text-center animate-fadeIn">
        <h1 className="text-8xl font-extrabold text-lime-600 mb-4">404</h1>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">Page Not Found</h2>

        <p className="text-gray-500 mb-8">Halaman yang kamu cari tidak ditemukan atau sudah dipindahkan.</p>

        <Link to="/" className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-green-600 to-lime-600 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition duration-300">
          Kembali ke Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
