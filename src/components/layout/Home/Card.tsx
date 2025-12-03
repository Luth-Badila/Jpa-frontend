import { useState, useEffect } from "react";

interface CardProps {
  id?: number;
  title: string;
  image: string;
  description?: string;
}

const Card: React.FC<CardProps> = ({ title, description, image }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="about">
      {loading ? (
        <div className="p-4 rounded-xl shadow-lg bg-white animate-pulse lg:h-160 h-140 flex flex-col gap-4">
          {/* IMAGE SKELETON */}
          <div className="w-full h-[170px] bg-gray-200 rounded-lg"></div>

          {/* TITLE */}
          <div className="h-5 bg-gray-200 rounded w-[70%]"></div>

          {/* DATE */}
          <div className="h-4 bg-gray-200 rounded w-[40%]"></div>

          {/* DESCRIPTION */}
          <div className="h-4 bg-gray-200 rounded w-[90%]"></div>
          <div className="h-4 bg-gray-200 rounded w-[80%]"></div>
        </div>
      ) : (
        <article className="flex flex-col gap-3 p-4 rounded-xl shadow-lg bg-white lg:h-160 h-140">
          <img src={image} alt={title} className="w-100 lg:h-100 h-75 rounded-lg" />
          <h2 className="mt-3 text-xl font-semibold">{title}</h2>
          <p className="text-slate-700 text-sm">{description ?? "Tidak dideskripsikan"}</p>
        </article>
      )}
    </div>
  );
};

export default Card;
