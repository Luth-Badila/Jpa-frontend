import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import { supabase } from "../lib/supabaseClient";
import { ImagesOrder } from "../constants/images";
import ProductSelect from "./ProductOverlaySelect";

type ProductType = "tshirt" | "hoodie" | "longsleeve" | "sweatshirt";

const mockupImages: Record<ProductType, string> = {
  tshirt: ImagesOrder.tshirt,
  hoodie: ImagesOrder.hoodie,
  longsleeve: ImagesOrder.longsleeve,
  sweatshirt: ImagesOrder.sweatshirt,
};

export default function CanvasEditor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const mockupRef = useRef<fabric.Image | null>(null);

  const [productType, setProductType] = useState<ProductType>("tshirt");
  const [buyer_name, setBuyer_name] = useState("");
  const [price, setPrice] = useState(50000);
  const [total_orders, setTotalOrders] = useState<number>(1);
  const [whatsapp, setWhatsapp] = useState("");
  const [loading, setLoading] = useState(false);
  const [overlayFile, setOverlayFile] = useState<File | null>(null);

  // INIT CANVAS
  useEffect(() => {
    if (!canvasRef.current) return;

    fabricRef.current = new fabric.Canvas(canvasRef.current, {
      width: 500,
      height: 500,
      backgroundColor: "#ffffff",
      preserveObjectStacking: true,
    });

    return () => {
      fabricRef.current?.dispose();
    };
  }, []);

  // LOAD MOCKUP
  useEffect(() => {
    const canvas = fabricRef.current;
    if (!canvas) return;

    // Hapus semua object kecuali overlay user
    canvas.getObjects().forEach((obj) => {
      if (obj !== mockupRef.current) {
        canvas.remove(obj);
      }
    });

    // Buang mockup lama
    if (mockupRef.current) {
      canvas.remove(mockupRef.current);
      mockupRef.current = null;
    }

    // Anti-cache supaya gambar SELALU reload
    const finalUrl = mockupImages[productType] + "?cache=" + Math.random();

    fabric.Image.fromURL(
      finalUrl,
      (img) => {
        const canvas = fabricRef.current;
        if (!canvas) return;

        img.set({
          selectable: false,
          evented: false,
        });

        img.scaleToWidth(canvas.getWidth());

        mockupRef.current = img;

        // Masukkan mockup PASTI DI BELAKANG
        canvas.insertAt(img, 0, false);

        canvas.renderAll();
      },
      { crossOrigin: "anonymous" },
    );
  }, [productType]);

  // ADD OVERLAY
  const handleAddOverlay = (e: React.ChangeEvent<HTMLInputElement>) => {
    const canvas = fabricRef.current;
    if (!canvas) return;

    const file = e.target.files?.[0];
    if (!file) return;

    // SIMPAN FILE ASLI
    setOverlayFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      fabric.Image.fromURL(reader.result as string, (img) => {
        img.scaleToWidth(200); // hanya preview
        img.set({
          left: 150,
          top: 150,
          selectable: true,
        });

        canvas.add(img);
        canvas.setActiveObject(img);
        canvas.renderAll();
      });
    };

    reader.readAsDataURL(file);
  };

  // DELETE OVERLAY (DELETE KEY)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const canvas = fabricRef.current;
      if (!canvas) return;

      if (e.key === "Delete" || e.key === "Backspace") {
        const active = canvas.getActiveObject();
        if (active) {
          canvas.remove(active);
          canvas.discardActiveObject();
          canvas.renderAll();
        }
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // SUBMIT ORDER
  const handleSubmit = async () => {
    const canvas = fabricRef.current;
    if (!canvas) return;

    if (!buyer_name || !price || !whatsapp) {
      alert("Form masih ada yang kosong!");
      return;
    }

    if (!overlayFile) {
      alert("Overlay belum diupload!");
      return;
    }

    setLoading(true);

    try {
      /* =========================
       1️⃣ UPLOAD OVERLAY ASLI
    ========================= */
      const overlayName = `overlay/overlay_${Date.now()}_${overlayFile.name}`;

      const { error: overlayError } = await supabase.storage.from("order_images").upload(overlayName, overlayFile, {
        contentType: overlayFile.type,
        upsert: false,
      });

      if (overlayError) throw overlayError;

      const { data: overlayUrlData } = supabase.storage.from("order_images").getPublicUrl(overlayName);

      /* =========================
       2️⃣ EXPORT PREVIEW CANVAS
    ========================= */
      const previewDataUrl = canvas.toDataURL({
        format: "png",
        quality: 1,
      });

      const previewBlob = await (await fetch(previewDataUrl)).blob();
      const previewName = `preview/order_${Date.now()}.png`;

      const { error: previewError } = await supabase.storage.from("order_images").upload(previewName, previewBlob, {
        contentType: "image/png",
        upsert: false,
      });

      if (previewError) throw previewError;

      const { data: previewUrlData } = supabase.storage.from("order_images").getPublicUrl(previewName);

      /* =========================
       3️⃣ INSERT DATABASE
    ========================= */
      const { error: insertError } = await supabase.from("orders").insert([
        {
          buyer_name,
          product_type: productType,
          price,
          total_orders,
          whatsapp,
          preview_url: previewUrlData.publicUrl,
          overlay_url: overlayUrlData.publicUrl,
        },
      ]);

      if (insertError) throw insertError;

      /* =========================
       4️⃣ RESET CANVAS & FORM
    ========================= */
      canvas.getObjects().forEach((obj) => {
        if (obj !== mockupRef.current) {
          canvas.remove(obj);
        }
      });
      canvas.renderAll();

      setOverlayFile(null);
      setBuyer_name("");
      setWhatsapp("");
      setTotalOrders(1);
      setPrice(50000);
      setProductType("tshirt");

      alert("Order berhasil dikirim!");
    } catch (err) {
      console.error(err);
      alert("Gagal mengirim order!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-6 grid grid-cols-2 gap-6 py-18 lg:py-40">
      {/* FORM */}
      <div className="space-y-4">
        <h2 className="font-bold text-xl">Form Order</h2>

        <div>
          <label>Nama Pembeli</label>
          <input className="border p-2 w-full mt-1" value={buyer_name} onChange={(e) => setBuyer_name(e.target.value)} />
        </div>

        <div>
          <label>Pilih Produk</label>
          <ProductSelect value={productType} onChange={(val) => setProductType(val as ProductType)} />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Upload Overlay</label>

          <label className="flex items-center gap-2 justify-center w-full px-4 py-2 bg-yellow-400 text-white rounded-lg cursor-pointer hover:bg-yellow-500 transition">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v.75A2.25 2.25 0 005.25 19.5h13.5A2.25 2.25 0 0021 17.25v-.75M7.5 12l4.5-4.5L16.5 12m-4.5-4.5V15" />
            </svg>

            <span>Pilih Gambar</span>

            <input type="file" accept="image/*" onChange={handleAddOverlay} className="hidden" />
          </label>
        </div>

        <div>
          <label>Harga</label>
          <select className="border p-2 w-full mt-1" value={price} onChange={(e) => setPrice(Number(e.target.value))}>
            <option value={50000}>50.000</option>
            <option value={60000}>60.000</option>
            <option value={75000}>75.000</option>
          </select>
        </div>

        <div>
          <label>Jumlah Pesanan</label>
          <input type="number" className="border p-2 rounded w-full mt-1" value={total_orders} onChange={(e) => setTotalOrders(Number(e.target.value))} />
        </div>

        <div>
          <label>Whatsapp</label>
          <input className="border p-2 w-full mt-1" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
        </div>

        <button onClick={handleSubmit} disabled={loading} className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded mt-4 cursor-pointer">
          {loading ? "Mengirim..." : "Kirim Order"}
        </button>
      </div>

      {/* CANVAS */}
      <div className="flex justify-center">
        <canvas ref={canvasRef} className="border shadow-lg rounded" />
      </div>
    </div>
  );
}
