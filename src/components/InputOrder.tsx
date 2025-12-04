import { useState, useRef, useEffect, useCallback } from "react";
import { supabase } from "../api/supabaseClient";
import { ImagesOrder, type ImageKeys } from "../constants/images";
import { OverlayItem } from "../types";
import ProductSelect from "./ProductOverlaySelect";

export default function InputOrder() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const bgImageRef = useRef<HTMLImageElement | null>(null);

  const [productType, setProductType] = useState<ImageKeys>("tshirt");
  const [background, setBackground] = useState(ImagesOrder.tshirt);

  const [overlays, setOverlays] = useState<OverlayItem[]>([]);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [dragMode, setDragMode] = useState<"move" | "resize" | "rotate" | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // FORM STATE
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [total_orders, setTotalOrders] = useState<number>(1);
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");

  // === UPDATE BACKGROUND KETIKA PRODUCTTYPE BERUBAH ===
  useEffect(() => {
    setBackground(ImagesOrder[productType]);
  }, [productType]);

  // === LOAD BACKGROUND IMAGE ===
  useEffect(() => {
    const img = new Image();
    img.src = background;

    img.onload = () => {
      bgImageRef.current = img;
      renderCanvas();
    };
  }, [background, overlays]);

  // === DRAW CANVAS ===
  const renderCanvas = useCallback(() => {
    if (!canvasRef.current || !bgImageRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 1280;
    canvas.height = 720;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // gambar background
    ctx.drawImage(bgImageRef.current, 0, 0, canvas.width, canvas.height);

    // gambar overlay
    overlays.forEach((ov) => {
      const img = new Image();
      img.src = ov.src;

      img.onload = () => {
        ctx.save();
        ctx.translate(ov.x + ov.w / 2, ov.y + ov.h / 2);
        ctx.rotate(ov.rotation);
        ctx.drawImage(img, -ov.w / 2, -ov.h / 2, ov.w, ov.h);
        ctx.restore();

        // Border
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.strokeRect(ov.x, ov.y, ov.w, ov.h);

        // Resize handle
        ctx.fillStyle = "red";
        ctx.fillRect(ov.x + ov.w - 12, ov.y + ov.h - 12, 12, 12);

        // Rotate handle
        ctx.fillStyle = "yellow";
        ctx.beginPath();
        ctx.arc(ov.x + ov.w / 2, ov.y - 20, 8, 0, Math.PI * 2);
        ctx.fill();

        // Delete handle
        ctx.fillStyle = "black";
        ctx.fillRect(ov.x - 15, ov.y - 15, 15, 15);
      };
    });
  }, [overlays]);

  useEffect(() => {
    renderCanvas();
  }, [overlays, renderCanvas]);

  // === UPLOAD OVERLAY ===
  const handleOverlayUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);

    const newItems = files.map((file, idx) => ({
      id: Date.now() + idx,
      src: URL.createObjectURL(file),
      x: 100,
      y: 100,
      w: 180,
      h: 180,
      rotation: 0,
    }));

    setOverlays((prev) => [...prev, ...newItems]);
  };

  // === CHECK AREA ===
  const isInside = (ov: OverlayItem, x: number, y: number) => x >= ov.x && x <= ov.x + ov.w && y >= ov.y && y <= ov.y + ov.h;

  const isResizeHandle = (ov: OverlayItem, x: number, y: number) => x >= ov.x + ov.w - 15 && y >= ov.y + ov.h - 15;

  const isRotateHandle = (ov: OverlayItem, x: number, y: number) => {
    const cx = ov.x + ov.w / 2;
    const cy = ov.y - 20;
    return Math.hypot(x - cx, y - cy) < 12;
  };

  const isDeleteHandle = (ov: OverlayItem, x: number, y: number) => x >= ov.x - 15 && x <= ov.x && y >= ov.y - 15 && y <= ov.y;

  // === MOUSE DOWN ===
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvasRef.current.width / rect.width);
    const y = (e.clientY - rect.top) * (canvasRef.current.height / rect.height);

    for (const ov of overlays) {
      if (isDeleteHandle(ov, x, y)) {
        setOverlays((prev) => prev.filter((i) => i.id !== ov.id));
        return;
      }

      if (isResizeHandle(ov, x, y)) {
        setActiveId(ov.id);
        setDragMode("resize");
        return;
      }

      if (isRotateHandle(ov, x, y)) {
        setActiveId(ov.id);
        setDragMode("rotate");
        return;
      }

      if (isInside(ov, x, y)) {
        setActiveId(ov.id);
        setDragMode("move");
        setOffset({ x: x - ov.x, y: y - ov.y });
        return;
      }
    }
  };

  // === MOUSE MOVE ===
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !dragMode || activeId === null) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvasRef.current.width / rect.width);
    const y = (e.clientY - rect.top) * (canvasRef.current.height / rect.height);

    setOverlays((prev) =>
      prev.map((ov) => {
        if (ov.id !== activeId) return ov;

        if (dragMode === "move") {
          return { ...ov, x: x - offset.x, y: y - offset.y };
        }

        if (dragMode === "resize") {
          return { ...ov, w: x - ov.x, h: y - ov.y };
        }

        if (dragMode === "rotate") {
          const cx = ov.x + ov.w / 2;
          const cy = ov.y + ov.h / 2;
          return { ...ov, rotation: Math.atan2(y - cy, x - cx) };
        }

        return ov;
      })
    );
  };

  const handleMouseUp = () => {
    setDragMode(null);
    setActiveId(null);
  };

  // === UPLOAD ORDER ===
  const handleUpload = async () => {
    if (!canvasRef.current) return;

    canvasRef.current.toBlob(async (blob) => {
      if (!blob) return;

      const fileName = `design-${Date.now()}.png`;

      const { error } = await supabase.storage.from("images").upload(fileName, blob);
      if (error) return alert(error.message);

      const { data: urlData } = supabase.storage.from("images").getPublicUrl(fileName);

      await supabase.from("orders").insert([
        {
          title,
          price,
          total_orders,
          whatsapp,
          email,
          product_type: productType,
          image_url: urlData?.publicUrl,
        },
      ]);

      alert("Berhasil disimpan!");

      setTitle("");
      setPrice(0);
      setTotalOrders(1);
      setWhatsapp("");
      setEmail("");
      setProductType("tshirt");
      setOverlays([]);
    });
  };

  return (
    <div className="px-4 flex flex-col gap-6 py-20 lg:py-28">
      {/* SELECT PRODUK */}
      <div className="flex gap-4 flex-wrap">
        {/* <select className="border p-2" value={productType} onChange={(e) => setProductType(e.target.value as ImageKeys)}>
          <option value="tshirt">T-shirt</option>
          <option value="longsleeve">Longsleeve</option>
          <option value="hoodie">Hoodie</option>
          <option value="sweatshirt">Sweatshirt</option>
        </select> */}
        <ProductSelect value={productType} onChange={(val) => setProductType(val as ImageKeys)} />

        <label className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer">
          Upload Desain
          <input type="file" multiple className="hidden" onChange={handleOverlayUpload} />
        </label>
      </div>

      {/* CANVAS */}
      <div className="w-full max-w-[1280px] mx-auto">
        <canvas ref={canvasRef} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} className="border w-full h-[400px] lg:h-[1000px]" />
      </div>

      {/* FORM */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label>Nama Pembeli</label>
          <input className="border p-2 rounded" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div className="flex flex-col">
          <label>Pilihan Harga</label>
          <select className="border p-2 rounded" value={price || ""} onChange={(e) => setPrice(Number(e.target.value))}>
            <option value="">-- Pilih Harga --</option>
            <option value={50000}>Rp 50.000</option>
            <option value={60000}>Rp 60.000</option>
            <option value={75000}>Rp 75.000</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label>Jumlah Pesanan</label>
          <input type="number" className="border p-2 rounded" value={total_orders} onChange={(e) => setTotalOrders(Number(e.target.value))} />
        </div>

        <div className="flex flex-col">
          <label>WhatsApp</label>
          <input className="border p-2 rounded" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
        </div>

        <div className="flex flex-col">
          <label>Email</label>
          <input className="border p-2 rounded" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
      </div>

      <button onClick={handleUpload} className="bg-green-600 text-white px-6 py-2 rounded text-lg w-fit cursor-pointer">
        Kirim Pesanan
      </button>
    </div>
  );
}
