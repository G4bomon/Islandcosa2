"use client";
import React from "react";
import Carousel from "@/components/Carousel"; // Reutilizamos el componente existente
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const PlayaCarousel: React.FC<{ newsArticles: any[] }> = ({ newsArticles }) => {
  // Filtrar solo artículos de la categoría "Playa"
  const PlayaArticles = newsArticles.filter((article) => article.category === "Playa");

  if (PlayaArticles.length === 0) return null; // Si no hay noticias, no mostrar nada

  return (
    <div className="pt-8">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Noticias de Playa</h2>
      <Carousel>
        {PlayaArticles.map((article) => (
          <Link href={`/view/${article._id}/full`} key={article._id}>
            <div className="border p-4 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105">
              <h2 className="text-xl font-semibold">{article.title}</h2>
              <p className="text-sm text-gray-500">Autor: {article.author || "Desconocido"}</p>
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

export default PlayaCarousel;
