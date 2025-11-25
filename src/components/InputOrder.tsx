import { useState, useRef, useEffect, useCallback } from "react";
import { supabase } from "../api/supabaseClient";

export default function InputOrder() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [background, setBackground] = useState<string | null>(null);
  const [overlay, setOverlay] = useState<string | null>(null);
  const [overlayPos, setOverlayPos] = useState({ x: 50, y: 50 });

  // form
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [total_orders, setTotal_orders] = useState<number>(1);
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");

  // render canvas
  const renderCanvas = useCallback(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 1280; // resolusi tetap
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
  }, [background, overlay, overlayPos]);

  useEffect(() => {
    renderCanvas();
  }, [renderCanvas]);

  const handleBackgroundUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setBackground(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleOverlayUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setOverlay(URL.createObjectURL(e.target.files[0]));
    }
  };

  // drag overlay mengikuti scaling canvas (responsif)
  const handleMouseDrag = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!overlay || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    setOverlayPos({
      x: (e.clientX - rect.left) * scaleX - 64,
      y: (e.clientY - rect.top) * scaleY - 64,
    });
  };

  const handleUpload = async () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;

    canvas.toBlob(async (blob) => {
      if (!blob) return;
      const fileName = `edited-${Date.now()}.png`;

      const { error } = await supabase.storage.from("images").upload(fileName, blob, { contentType: "image/png" });

      if (error) {
        console.error("Upload error:", error.message);
        return;
      }

      const { data: publicUrl } = supabase.storage.from("images").getPublicUrl(fileName);

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
      } else {
        alert("✅ Gambar & data berhasil diupload ke Supabase!");

        setBackground(null);
        setOverlay(null);
        setOverlayPos({ x: 50, y: 50 });
        setTitle("");
        setPrice(0);
        setTotal_orders(1);
        setWhatsapp("");
        setEmail("");

        const ctx = canvas.getContext("2d");
        if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }, "image/png");
  };

  return (
    <div className="p-4 flex flex-col gap-4 max-w-full py-18 lg:py-30">
      {/* Upload Buttons */}
      <div className="flex flex-wrap gap-4 lg:ml-5">
        <label className="cursor-pointer bg-green-500 text-white px-4 py-2 rounded">
          Upload Background
          <input type="file" accept="image/*" className="hidden" onChange={handleBackgroundUpload} />
        </label>

        <label className="cursor-pointer bg-green-500 text-white px-4 py-2 rounded">
          Upload Overlay
          <input type="file" accept="image/*" className="hidden" onChange={handleOverlayUpload} />
        </label>
      </div>

      {/* Canvas Wrapper (RESPONSIVE) */}
      <div className="w-full max-w-[1280px] mx-auto">
        <canvas ref={canvasRef} onClick={handleMouseDrag} className="border bg-gray-200 w-full lg:h-[800px] h-[400px]" />
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 gap-2 lg:w-[1280px] w-full mx-auto">
        <label htmlFor="title">Nama Pembeli</label>
        <input className="border p-2" placeholder="Judul" value={title} onChange={(e) => setTitle(e.target.value)} />
        <label htmlFor="price">Harga yang diinginkan</label>
        <input className="border p-2" type="number" placeholder="Harga" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
        <label htmlFor="JumlahPesanan">Jumlah Pesanan</label>
        <input className="border p-2" type="number" placeholder="Jumlah Pesanan" value={total_orders} onChange={(e) => setTotal_orders(Number(e.target.value))} />
        <label htmlFor={title}>No Whatsapp yang aktif</label>
        <input className="border p-2" placeholder="No WhatsApp" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
        <label htmlFor={title}>Email</label>
        <input className="border p-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <button onClick={handleUpload} className="bg-green-600 text-white lg:ml-5 px-4 py-2 rounded w-fit">
        Kirim
      </button>
    </div>
  );
}
