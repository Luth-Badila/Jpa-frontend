import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/Dashboard/DashboardLayout";
import { useParams, useNavigate } from "react-router-dom";
import { getItem } from "../api/items";
const ItemDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState(null);
    useEffect(() => {
        if (!id)
            return;
        (async () => {
            const data = await getItem(Number(id));
            setItem(data);
        })();
    }, [id]);
    return (_jsxs(DashboardLayout, { children: [_jsxs("div", { className: "mb-4 flex items-center justify-between", children: [_jsx("h1", { className: "text-2xl font-semibold", children: "Item Detail" }), _jsx("button", { onClick: () => navigate("/items"), className: "px-3 py-1 bg-gray-200 rounded", children: "Back" })] }), _jsx("div", { className: "bg-white p-6 rounded shadow max-w-2xl", children: !item ? (_jsx("div", { children: "Loading..." })) : (_jsxs(_Fragment, { children: [_jsx("h2", { className: "text-xl font-bold", children: item.title }), _jsx("p", { className: "text-sm text-slate-500 mb-4", children: new Date(item.created_at).toLocaleString() }), _jsx("div", { className: "prose", dangerouslySetInnerHTML: { __html: item.description ?? "<i>No description</i>" } })] })) })] }));
};
export default ItemDetailPage;
