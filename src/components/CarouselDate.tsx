"use client";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Carousel from "@/components/Carousel";

const CarouselDate: React.FC<{ newsArticles: any[] }> = ({ newsArticles }) => {
  // Filtrar artículos de los últimos 7 días
  const getRecentArticles = () => {
    const now = new Date();
    return newsArticles.filter((article) => {
      const articleDate = new Date(article.date);
      // Comparar si la fecha del artículo es dentro de los últimos 7 días
      return (now.getTime() - articleDate.getTime()) / (1000 * 60 * 60 * 24) <= 7;
    });
  };

  const recentArticles = getRecentArticles();

  return (
    <div className="pt-8">
      {/* Título visible "Agregado recientemente" */}
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Agregado recientemente</h2>

      {/* Carrusel de artículos recientes */}
      <Carousel>
        {recentArticles.map((article) => (
          <Link href={`/view/${article._id}/full`} key={article._id}>
            <div className="border p-4 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105">
              <h3 className="text-xl font-semibold text-blue-600">{article.title}</h3>
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
