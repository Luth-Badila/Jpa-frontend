import { useState, useRef, useEffect, useCallback } from "react";
import { supabase } from "../api/supabaseClient";
import { ImagesOrder, type ImageKeys } from "../constants/images";

interface OverlayItem {
  id: number;
  src: string;
  x: number;
  y: number;
}

export default function InputOrder() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [productType, setProductType] = useState<ImageKeys>("tshirt");
  const [background, setBackground] = useState(ImagesOrder.tshirt);

  const [overlays, setOverlays] = useState<OverlayItem[]>([]);
  const [activeId, setActiveId] = useState<number | null>(null);

  // FORM STATE
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [total_orders, setTotalOrders] = useState<number>(1);
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");

  // CHANGE BACKGROUND WHEN PRODUCT CHANGES
  useEffect(() => {
    setBackground(ImagesOrder[productType]);
  }, [productType]);

  // RENDER CANVAS
  const renderCanvas = useCallback(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 1280;
    canvas.height = 720;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const bg = new Image();
    bg.src = background;

    bg.onload = () => {
      ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

      overlays.forEach((ov) => {
        const img = new Image();
        img.src = ov.src;
        img.onload = () => {
          ctx.drawImage(img, ov.x, ov.y, 160, 160);
        };
      });
    };
  }, [background, overlays]);

  useEffect(() => {
    renderCanvas();
  }, [renderCanvas]);

  // UPLOAD OVERLAY IMAGE
  const handleOverlayUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);

    const newItems = files.map((file, idx) => ({
      id: Date.now() + idx,
      src: URL.createObjectURL(file),
      x: 100,
      y: 100,
    }));

    setOverlays((prev) => [...prev, ...newItems]);
  };

  // DRAG & MOVE OVERLAY
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = canvasRef.current.width / rect.width;
    const scaleY = canvasRef.current.height / rect.height;

    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    const clicked = overlays.find((ov) => x >= ov.x && x <= ov.x + 160 && y >= ov.y && y <= ov.y + 160);

    if (clicked) setActiveId(clicked.id);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || activeId === null) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = canvasRef.current.width / rect.width;
    const scaleY = canvasRef.current.height / rect.height;

    const x = (e.clientX - rect.left) * scaleX - 80;
    const y = (e.clientY - rect.top) * scaleY - 80;

    setOverlays((prev) => prev.map((ov) => (ov.id === activeId ? { ...ov, x, y } : ov)));
  };

  const handleMouseUp = () => setActiveId(null);

  // UPLOAD FINAL IMAGE TO SUPABASE
  // const handleUpload = async () => {
  //   if (!canvasRef.current) return;

  //   canvasRef.current.toBlob(async (blob) => {
  //     if (!blob) return;

  //     const fileName = `design-${Date.now()}.png`;

  //     const { error } = await supabase.storage.from("images").upload(fileName, blob);

  //     if (error) return alert("Upload error: " + error.message);

  //     const { data: urlData } = supabase.storage.from("images").getPublicUrl(fileName);

  //     await supabase.from("orders").insert([
  //       {
  //         title,
  //         price,
  //         total_orders,
  //         whatsapp,
  //         email,
  //         product_type: productType,
  //         image_url: urlData?.publicUrl,
  //       },
  //     ]);

  //     alert("Berhasil disimpan!");
  //   });
  // };
  const handleUpload = async () => {
    if (!canvasRef.current) return;

    canvasRef.current.toBlob(async (blob) => {
      if (!blob) return;

      const fileName = `design-${Date.now()}.png`;

      // Upload gambar ke Supabase Storage
      const { error } = await supabase.storage.from("images").upload(fileName, blob);

      if (error) return alert("Upload error: " + error.message);

      const { data: urlData } = supabase.storage.from("images").getPublicUrl(fileName);

      // Insert ke database
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

      // 🔥 RESET FORM
      setTitle("");
      setPrice(0);
      setTotalOrders(1);
      setWhatsapp("");
      setEmail("");

      // 🔥 RESET PRODUK & BACKGROUND
      setProductType("tshirt");
      setBackground(ImagesOrder.tshirt);

      // 🔥 HAPUS SEMUA OVERLAY
      setOverlays([]);

      // render ulang canvas
      renderCanvas();
    });
  };

  return (
    <div className="px-4 flex flex-col gap-6 py-20 lg:py-28">
      {/* SELECT PRODUK */}
      <div className="flex gap-4 flex-wrap">
        <select className="border p-2" value={productType} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setProductType(e.target.value as ImageKeys)}>
          <option value="tshirt">T-shirt</option>
          <option value="longsleeve">Longsleeve</option>
          <option value="hoodie">Hoodie</option>
          <option value="sweatshirt">Sweatshirt</option>
        </select>

        <label className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">
          Upload Desain
          <input type="file" multiple className="hidden" onChange={handleOverlayUpload} />
        </label>
      </div>

      {/* CANVAS */}
      <div className="w-full max-w-[1280px] mx-auto">
        <canvas ref={canvasRef} onMouseDown={handleCanvasClick} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} className="border bg-gray-200 w-full h-[400px] lg:h-[800px]" />
      </div>

      {/* FORM (TIDAK DIHILANGKAN) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input className="border p-2 rounded" placeholder="Nama Produk / Judul" value={title} onChange={(e) => setTitle(e.target.value)} />

        <input type="number" className="border p-2 rounded" placeholder="Harga" value={price} onChange={(e) => setPrice(Number(e.target.value))} />

        <input type="number" className="border p-2 rounded" placeholder="Jumlah Pesanan" value={total_orders} onChange={(e) => setTotalOrders(Number(e.target.value))} />

        <input className="border p-2 rounded" placeholder="Nomor WhatsApp" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />

        <input className="border p-2 rounded" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <button onClick={handleUpload} className="bg-green-600 text-white px-6 py-2 rounded text-lg w-fit cursor-pointer">
        Kirim Pesanan
      </button>
    </div>
  );
}
