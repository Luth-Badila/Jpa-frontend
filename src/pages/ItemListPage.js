import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layout/Dashboard/DashboardLayout";
import { getItems, deleteItem } from "../api/items";
import { useFetch } from "../hooks/useFetch";
const ItemsListPage = () => {
    const navigate = useNavigate();
    const { data, loading, error, setData } = useFetch(getItems, []);
    const handleDelete = async (id) => {
        if (!confirm("Hapus item ini?"))
            return;
        await deleteItem(id);
        setData?.(data?.filter((d) => d.id !== id) ?? null);
    };
    return (_jsxs(DashboardLayout, { children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx("h1", { className: "text-2xl font-semibold", children: "Items" }), _jsx("div", { children: _jsx("button", { onClick: () => navigate("/items/new"), className: "px-4 py-2 bg-blue-600 text-white rounded", children: "Create" }) })] }), loading && _jsx("div", { children: "Loading..." }), error && _jsxs("div", { className: "text-red-500", children: ["Error: ", error.message] }), _jsx("div", { className: "bg-white shadow rounded overflow-hidden", children: _jsxs("table", { className: "w-full text-left", children: [_jsx("thead", { className: "bg-slate-100", children: _jsxs("tr", { children: [_jsx("th", { className: "p-3", children: "#" }), _jsx("th", { className: "p-3", children: "Title" }), _jsx("th", { className: "p-3", children: "Created At" }), _jsx("th", { className: "p-3", children: "Actions" })] }) }), _jsx("tbody", { children: data && data.length > 0 ? (data.map((item) => (_jsxs("tr", { className: "border-t", children: [_jsx("td", { className: "p-3", children: item.id }), _jsx("td", { className: "p-3", children: item.title }), _jsx("td", { className: "p-3", children: new Date(item.created_at).toLocaleString() }), _jsxs("td", { className: "p-3", children: [_jsx("button", { onClick: () => navigate(`/items/${item.id}`), className: "mr-2 text-blue-600", children: "View" }), _jsx("button", { onClick: () => navigate(`/items/${item.id}/edit`), className: "mr-2 text-amber-600", children: "Edit" }), _jsx("button", { onClick: () => handleDelete(item.id), className: "text-red-600", children: "Delete" })] })] }, item.id)))) : (_jsx("tr", { children: _jsx("td", { colSpan: 4, className: "p-4", children: "No items" }) })) })] }) })] }));
};
export default ItemsListPage;
