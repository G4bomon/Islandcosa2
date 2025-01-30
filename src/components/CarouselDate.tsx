"use client";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Carousel from "@/components/Carousel";

const CarouselDate: React.FC<{ newsArticles: any[] }> = ({ newsArticles }) => {
  const [dateFilter, setDateFilter] = useState<string>("All");

  // Función para filtrar noticias por fecha
  const getFilteredArticles = () => {
    const now = new Date();
    return newsArticles.filter((article) => {
      const articleDate = new Date(article.date);

      if (dateFilter === "Last 7 Days") {
        return (now.getTime() - articleDate.getTime()) / (1000 * 60 * 60 * 24) <= 7;
      } 
      if (dateFilter === "Last Month") {
        return now.getMonth() === articleDate.getMonth() && now.getFullYear() === articleDate.getFullYear();
      }
      return true; // "All" -> Mostrar todas
    });
  };

  const filteredArticles = getFilteredArticles();

  return (
    <div className="pt-8">
      {/* Botones de filtro por fecha */}
      <div className="mb-4 flex flex-wrap gap-2">
        {["All", "Last 7 Days", "Last Month"].map((filter) => (
          <button
            key={filter}
            onClick={() => setDateFilter(filter)}
            className={`px-4 py-2 rounded ${
              dateFilter === filter
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Carrusel filtrado */}
      <Carousel>
        {filteredArticles.map((article) => (
          <Link href={`/view/${article._id}/full`} key={article._id}>
            <div className="border p-4 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105">
              <h2 className="text-xl font-semibold text-blue-600">{article.title}</h2>
              <p className="text-sm text-gray-500">Autor: {article.author || "Desconocido"}</p>
              <p className="text-sm text-gray-400">
                Publicado el: {new Date(article.date).toLocaleDateString("es-ES")}
              </p>
              <Badge className="mt-2">{article.category}</Badge>
              {article.image && (
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-64 object-cover mt-4 rounded-lg"
                  loading="lazy"
                />
              )}
            </div>
          </Link>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselDate;
