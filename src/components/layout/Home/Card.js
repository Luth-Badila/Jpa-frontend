import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
const Card = ({ title, created_at, description }) => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        // simulasi loading 1 detik
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);
    return (_jsx("div", { id: "about", children: loading ? (
        // Skeleton loading
        Array.from({ length: 3 }).map((_, idx) => (_jsxs("div", { className: "p-4 border rounded bg-white animate-pulse space-y-3 h-[150px] max-w-[350px]", children: [_jsx("div", { className: "h-5 bg-gray-200 rounded w-[350px]" }), _jsx("div", { className: "h-3 bg-gray-200 rounded w-[350px]" }), _jsx("div", { className: "h-4 bg-gray-200 rounded w-[350px]" }), _jsx("div", { className: "h-4 bg-gray-200 rounded w-[350px]" })] }, idx)))) : (_jsxs("article", { className: "p-4 rounded-xl h-[150px] w-[350px] shadow-lg", children: [_jsx("h2", { className: "text-xl font-semibold", children: title }), _jsx("p", { className: "text-sm text-slate-500 mb-2", children: new Date(created_at).toLocaleString() }), _jsx("p", { children: description ?? "Tidak dideskripsikan" })] })) }));
};
export default Card;
