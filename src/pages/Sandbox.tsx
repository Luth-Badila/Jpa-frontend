import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../api/supabaseClient";

export default function ImageEditor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [background, setBackground] = useState<string | null>(null);
  const [overlay, setOverlay] = useState<string | null>(null);
  const [overlayPos, setOverlayPos] = useState({ x: 50, y: 50 });

  // upload background
  const handleBackgroundUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setBackground(URL.createObjectURL(e.target.files[0]));
    }
  };

  // upload overlay
  const handleOverlayUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setOverlay(URL.createObjectURL(e.target.files[0]));
    }
  };

  // simpan hasil ke Supabase
  const handleSave = async () => {
    if (!canvasRef.current || !background) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bg = new Image();
    bg.src = background;

    bg.onload = async () => {
      // set ukuran canvas sesuai background
      canvas.width = 600;
      canvas.height = 400;

      // gambar background
      ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

      if (overlay) {
        const ov = new Image();
        ov.src = overlay;

        ov.onload = async () => {
          // gambar overlay sesuai posisi drag
          ctx.drawImage(ov, overlayPos.x, overlayPos.y, 128, 128);

          // convert ke blob dan upload
          canvas.toBlob(async (blob) => {
            if (!blob) return;
            const fileName = `edited-${Date.now()}.png`;

            const { data, error } = await supabase.storage.from("images").upload(fileName, blob, {
              contentType: "image/png",
            });

            if (error) {
              console.error("Upload error:", error.message);
            } else {
              console.log("✅ Uploaded:", data);
              alert("✅ Gambar berhasil diupload ke Supabase!");
            }
          }, "image/png");
        };
      }
    };
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* uploaders */}
      <label className="cursor-pointer bg-green-500 text-white px-4 py-2 rounded">
        
        Upload Background 
        <input type="file" accept="image/*" className="hidden" onChange={handleBackgroundUpload} />
        
      </label>
     
      <label className="cursor-pointer bg-green-500 text-white px-4 py-2 rounded">
        
        Upload Overlay
        <input type="file" accept="image/*" className="hidden" onChange={handleOverlayUpload} />
        
      </label>
     

      {/* editor */}
      <div ref={containerRef} className="relative border w-[600px] h-[400px] bg-gray-200">
        {background && <img src={background} alt="bg" className="absolute inset-0 w-full h-full object-cover" />}

        {overlay && (
          <motion.img
            src={overlay}
            alt="overlay"
            drag
            dragMomentum={false}
            className="absolute w-32 h-32 cursor-move"
            style={{ left: overlayPos.x, top: overlayPos.y }}
            onDragEnd={(_, info) => {
              if (!containerRef.current) return;

              const rect = containerRef.current.getBoundingClientRect();

              // hitung posisi relatif ke container
              const newX = info.point.x - rect.left - 64; // 64 = setengah width overlay
              const newY = info.point.y - rect.top - 64;

              setOverlayPos({ x: newX, y: newY });
            }}
          />
        )}
      </div>

      {/* canvas hidden */}
      <canvas ref={canvasRef} className="hidden" />

      <button onClick={handleSave} className="px-4 py-2 bg-green-500 text-white rounded cursor-pointer">
        Simpan ke Supabase
      </button>
    </div>
  );
}
