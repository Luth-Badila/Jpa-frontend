import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import DashboardLayout from "../components/layout/Dashboard/DashboardLayout";
const EditPage = () => {
    const [headerHtml, setHeaderHtml] = useState("<h1>Welcome to our site</h1>");
    return (_jsxs(DashboardLayout, { children: [_jsx("h2", { className: "text-xl font-semibold mb-4", children: "Edit Site Content" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "bg-white p-4 rounded shadow", children: [_jsx("div", { className: "text-sm text-slate-500 mb-2", children: "Header" }), _jsx("div", { contentEditable: true, suppressContentEditableWarning: true, onInput: (e) => setHeaderHtml(e.target.innerHTML), className: "border p-4 rounded min-h-[60px]", dangerouslySetInnerHTML: { __html: headerHtml } })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx("button", { className: "px-4 py-2 bg-green-600 text-white rounded", onClick: () => alert("Simulate save to backend:\n\n" + headerHtml), children: "Save" }), _jsx("button", { className: "px-4 py-2 bg-gray-200 rounded", onClick: () => setHeaderHtml("<h1>Welcome to our site</h1>"), children: "Reset" })] })] })] }));
};
export default EditPage;
