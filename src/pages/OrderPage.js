import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useRef, useEffect, useCallback } from "react";
import { supabase } from "../api/supabaseClient";
import Navbar from "../components/Navbar";
export default function OrderPage() {
    const canvasRef = useRef(null);
    const [background, setBackground] = useState(null);
    const [overlay, setOverlay] = useState(null);
    const [overlayPos, setOverlayPos] = useState({ x: 50, y: 50 });
    // form
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [total_orders, setTotal_orders] = useState(1);
    const [whatsapp, setWhatsapp] = useState("");
    const [email, setEmail] = useState("");
    // render canvas (dibungkus useCallback supaya bisa jadi dependency aman)
    const renderCanvas = useCallback(() => {
        if (!canvasRef.current)
            return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx)
            return;
        canvas.width = 1280;
        canvas.height = 720;
        // clear dulu
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (background) {
            const bg = new Image();
            bg.src = background;
            bg.onload = () => {
                ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
                if (overlay) {
                    const ov = new Image();
                    ov.src = overlay;
                    ov.onload = () => {
                        ctx.drawImage(ov, overlayPos.x, overlayPos.y, 128, 128);
                    };
                }
            };
        }
    }, [background, overlay, overlayPos]);
    // rerender kalau background/overlay berubah
    useEffect(() => {
        renderCanvas();
    }, [renderCanvas]);
    // upload background
    const handleBackgroundUpload = (e) => {
        if (e.target.files?.[0]) {
            setBackground(URL.createObjectURL(e.target.files[0]));
        }
    };
    // upload overlay
    const handleOverlayUpload = (e) => {
        if (e.target.files?.[0]) {
            setOverlay(URL.createObjectURL(e.target.files[0]));
        }
    };
    const handleMouseDrag = (e) => {
        if (!overlay)
            return;
        const rect = e.currentTarget.getBoundingClientRect();
        setOverlayPos({
            x: e.clientX - rect.left - 64,
            y: e.clientY - rect.top - 64,
        });
    };
    const handleUpload = async () => {
        if (!canvasRef.current)
            return;
        const canvas = canvasRef.current;
        canvas.toBlob(async (blob) => {
            if (!blob)
                return;
            const fileName = `edited-${Date.now()}.png`;
            // Upload ke storage
            const { error } = await supabase.storage.from("images").upload(fileName, blob, { contentType: "image/png" });
            if (error) {
                console.error("Upload error:", error.message);
                return;
            }
            // Ambil URL publik
            const { data: publicUrl } = supabase.storage.from("images").getPublicUrl(fileName);
            // Simpan metadata ke table orders
            const { error: insertError } = await supabase.from("orders").insert([
                {
                    title,
                    price,
                    total_orders,
                    whatsapp,
                    email,
                    image_url: publicUrl.publicUrl,
                },
            ]);
            if (insertError) {
                console.error("Insert error:", insertError.message);
            }
            else {
                alert("✅ Gambar & data berhasil diupload ke Supabase!");
                // reset semua state
                setBackground(null);
                setOverlay(null);
                setOverlayPos({ x: 50, y: 50 });
                setTitle("");
                setPrice(0);
                setTotal_orders(1);
                setWhatsapp("");
                setEmail("");
                // clear canvas juga
                const ctx = canvas.getContext("2d");
                if (ctx)
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        }, "image/png");
    };
    return (_jsxs(_Fragment, { children: [_jsx(Navbar, { mode: "order" }), _jsxs("div", { className: "p-6 flex flex-col justify-center items-center gap-4 py-18 lg:py-40", children: [_jsxs("div", { className: "flex gap-4", children: [_jsxs("label", { className: "cursor-pointer bg-green-500 text-white px-4 py-2 rounded", children: ["Upload Background", _jsx("input", { type: "file", accept: "image/*", className: "hidden", onChange: handleBackgroundUpload })] }), _jsxs("label", { className: "cursor-pointer bg-green-500 text-white px-4 py-2 rounded", children: ["Upload Overlay", _jsx("input", { type: "file", accept: "image/*", className: "hidden", onChange: handleOverlayUpload })] })] }), _jsx("canvas", { ref: canvasRef, onClick: handleMouseDrag, className: "border lg:w-[600px] lg:h-[400px] w-[100%] bg-gray-200" }), _jsxs("div", { className: "flex flex-col gap-2 justify-center items-center", children: [_jsx("input", { className: "border p-2 lg:w-[600px] w-[330px]", placeholder: "Judul", value: title, onChange: (e) => setTitle(e.target.value) }), _jsx("input", { className: "border p-2 lg:w-[600px] w-[330px]", type: "number", placeholder: "Harga", value: price, onChange: (e) => setPrice(Number(e.target.value)) }), _jsx("input", { className: "border p-2 lg:w-[600px] w-[330px]", type: "number", placeholder: "Total Pesanan", value: total_orders, onChange: (e) => setTotal_orders(Number(e.target.value)) }), _jsx("input", { className: "border p-2 lg:w-[600px] w-[330px]", placeholder: "No WhatsApp", value: whatsapp, onChange: (e) => setWhatsapp(e.target.value) }), _jsx("input", { className: "border p-2 lg:w-[600px] w-[330px]", placeholder: "Email", value: email, onChange: (e) => setEmail(e.target.value) })] }), _jsx("button", { onClick: handleUpload, className: "bg-green-600 text-white px-4 py-2 rounded cursor-pointer", children: "Upload ke Supabase" })] })] }));
}
