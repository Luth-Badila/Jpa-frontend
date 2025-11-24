import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { getItems } from "../api/items";
import Hero from "../components/layout/Home/Hero";
import Card from "../components/layout/Home/Card";
// import About from "../components/layout/Home/About";
import Navbar from "../components/Navbar";
import Tabs from "../components/TabComponent";
import HelpIcon from "../components/HelpIcon";
function PublicHome() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        (async () => {
            const data = await getItems();
            setItems(data);
            setLoading(false);
        })();
    }, []);
    return (_jsxs(_Fragment, { children: [_jsx(Navbar, { mode: "home" }), _jsx(Hero, {}), _jsx("section", { className: "flex justify-center items-center flex-wrap gap-3 py-5", children: loading
                    ? Array.from({ length: 3 }).map((_, idx) => (_jsxs("div", { className: "p-4 border rounded bg-white animate-pulse", children: [_jsx("div", { className: "h-5 bg-gray-200 rounded w-[350px]" }), _jsx("div", { className: "h-3 bg-gray-200 rounded w-[350px]" }), _jsx("div", { className: "h-4 bg-gray-200 rounded w-[350px]" }), _jsx("div", { className: "h-4 bg-gray-200 rounded w-[350px]" })] }, idx)))
                    : items.map((item) => _jsx(Card, { id: item.id, title: item.title, created_at: new Date(item.created_at), description: item.description }, item.id)) }), _jsxs("div", { className: "max-w-2xl mx-auto mt-10", children: [_jsx("h1", { className: "text-2xl font-bold mb-4", children: "Reusable Tabs with Animation" }), _jsx(Tabs, { tabs: [
                            {
                                label: "Kaos",
                                content: _jsx("p", { children: "\u2728 Selamat datang di halaman Home!" }),
                            },
                            {
                                label: "Tas",
                                content: _jsx("p", { children: "\uD83D\uDC64 Ini adalah halaman Profile kamu." }),
                            },
                            {
                                label: "Polo",
                                content: _jsx("p", { children: "\u2699\uFE0F Atur preferensi kamu di halaman Settings." }),
                            },
                            {
                                label: "Semua",
                                content: _jsx("p", { children: "Semua" }),
                            },
                        ] })] }), _jsx(HelpIcon, {})] }));
}
export default PublicHome;
