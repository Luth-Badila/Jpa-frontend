import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import DashboardLayout from "../components/layout/Dashboard/DashboardLayout";
import { createItem, getItem, updateItem } from "../api/items";
import { useNavigate, useParams } from "react-router-dom";
const ItemFormPage = () => {
    const { id } = useParams();
    const isEdit = Boolean(id);
    const navigate = useNavigate();
    const { register, handleSubmit, reset, setValue } = useForm();
    useEffect(() => {
        if (isEdit && id) {
            (async () => {
                const data = await getItem(Number(id));
                if (data) {
                    setValue("title", data.title);
                    setValue("description", data.description ?? "");
                }
            })();
        }
        else {
            reset();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);
    const onSubmit = async (vals) => {
        try {
            if (isEdit && id) {
                await updateItem(Number(id), vals);
                alert("Updated");
            }
            else {
                await createItem(vals);
                alert("Created");
            }
            navigate("/items");
        }
        catch (err) {
            alert("Error: " + err.message);
        }
    };
    return (_jsxs(DashboardLayout, { children: [_jsx("h1", { className: "text-2xl font-semibold mb-4", children: isEdit ? "Edit Item" : "Create Item" }), _jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "bg-white p-6 rounded shadow max-w-2xl", children: [_jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: "Title" }), _jsx("input", { ...register("title", { required: true }), className: "w-full border p-2 rounded" })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: "Description" }), _jsx("textarea", { ...register("description"), className: "w-full border p-2 rounded", rows: 6 })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx("button", { type: "submit", className: "px-4 py-2 bg-green-600 text-white rounded\r\n           cursor-pointer", children: isEdit ? "Update" : "Create" }), _jsx("button", { type: "button", onClick: () => navigate("/items"), className: "px-4 py-2 bg-gray-200 rounded cursor-pointer", children: "Cancel" })] })] })] }));
};
export default ItemFormPage;
