import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { supabase } from "../api/supabaseClient";
export default function ImageEditor() {
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
    // fungsi untuk render ulang canvas
    const renderCanvas = () => {
        if (!canvasRef.current)
            return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx)
            return;
        canvas.width = 1280;
        canvas.height = 720;
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
    };
    // render ulang setiap kali background, overlay, atau posisi berubah
    useEffect(() => {
        renderCanvas();
    }, [background, overlay, overlayPos]);
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
            const { error: uploadError } = await supabase.storage.from("images").upload(fileName, blob, { contentType: "image/png" });
            if (uploadError) {
                console.error("Upload error:", uploadError.message);
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
                setTitle("");
                setPrice(0);
                setTotal_orders(1);
                setWhatsapp("");
                setEmail("");
            }
        }, "image/png");
    };
    return (_jsxs("div", { className: "p-6 flex flex-col gap-4 justify-center items-center", children: [_jsxs("div", { className: "flex gap-4", children: [_jsxs("label", { className: "cursor-pointer bg-green-500 text-white px-4 py-2 rounded", children: ["Upload Background", _jsx("input", { type: "file", accept: "image/*", className: "hidden", onChange: handleBackgroundUpload })] }), _jsxs("label", { className: "cursor-pointer bg-green-500 text-white px-4 py-2 rounded", children: ["Upload Overlay", _jsx("input", { type: "file", accept: "image/*", className: "hidden", onChange: handleOverlayUpload })] })] }), _jsx("canvas", { ref: canvasRef, onClick: handleMouseDrag, className: "border w-[1280px] h-[720px] bg-gray-200" }), _jsxs("div", { className: "flex flex-col gap-2", children: [_jsx("input", { className: "border p-2", placeholder: "Judul", value: title, onChange: (e) => setTitle(e.target.value) }), _jsx("input", { className: "border p-2", type: "number", placeholder: "Harga", value: price, onChange: (e) => setPrice(Number(e.target.value)) }), _jsx("input", { className: "border p-2", type: "number", placeholder: "Total Pesanan", value: total_orders, onChange: (e) => setTotal_orders(Number(e.target.value)) }), _jsx("input", { className: "border p-2", placeholder: "No WhatsApp", value: whatsapp, onChange: (e) => setWhatsapp(e.target.value) }), _jsx("input", { className: "border p-2", placeholder: "Email", value: email, onChange: (e) => setEmail(e.target.value) })] }), _jsx("button", { onClick: handleUpload, className: "bg-green-600 text-white px-4 py-2 rounded", children: "Upload ke Supabase" })] }));
}
