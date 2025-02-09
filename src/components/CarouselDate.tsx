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
      <h2 className="text-3xl font-semibold text-black mb-4">Agregado recientemente</h2>
      <Carousel>
        {recentArticles.map((article) => (
          <Link href={`/view/${article._id}/full`} key={article._id}>
            <div className="pb-4 hover:shadow-2xl transition duration-300 transform hover:scale-105">
              {article.image && (
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-64 object-cover "
                  loading="lazy"
                />
              )}
              <h3 className="text-lg font-semibold text-black text-center">{article.title}</h3>
              <p className="text-xs text-gray-400 text-center">
                Publicado el: {new Date(article.date).toLocaleDateString("es-ES")}
              </p>

            </div>
          </Link>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselDate;
