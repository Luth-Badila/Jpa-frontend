import { useState, useEffect } from "react";

interface CardProps {
  id?: number;
  title: string;
  created_at: Date;
  image: string;
  description?: string;
}

const Card: React.FC<CardProps> = ({ title, created_at, description, image }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // simulasi loading 1 detik
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="about">
      {loading ? (
        // Skeleton loading
        Array.from({ length: 3 }).map((_, idx) => (
          <div key={idx} className="p-4 border rounded bg-white animate-pulse space-y-3 h-[150px] max-w-[350px]">
            <div className="h-5 bg-gray-200 rounded w-[350px]"></div>
            <div className="h-3 bg-gray-200 rounded w-[350px]"></div>
            <div className="h-4 bg-gray-200 rounded w-[350px]"></div>
            <div className="h-4 bg-gray-200 rounded w-[350px]"></div>
          </div>
        ))
      ) : (
        <article className="p-4 rounded-xl h-auto shadow-lg">
          <img src={image} alt={title} />
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-sm text-slate-500 mb-2">{new Date(created_at).toLocaleString()}</p>
          <p>{description ?? "Tidak dideskripsikan"}</p>
        </article>
      )}
    </div>
  );
};

export default Card;
