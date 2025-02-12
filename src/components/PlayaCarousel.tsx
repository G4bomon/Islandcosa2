"use client";
import React from "react";
import Carousel from "@/components/Carousel"; // Reutilizamos el componente existente
import Link from "next/link";


const PlayaCarousel: React.FC<{ newsArticles: any[] }> = ({ newsArticles }) => {
  // Filtrar solo artículos de la categoría "Playa"
  const PlayaArticles = newsArticles.filter((article) => article.category === "Playa");

  if (PlayaArticles.length === 0) return null; // Si no hay noticias, no mostrar nada

  return (
    <div className="pt-8">
      <h2 className="text-3xl font-semibold text-black mb -4 pl-4">Planes en {PlayaArticles[0]?.category}</h2>
      <Carousel>
        {PlayaArticles.map((article) => (
          <Link href={`/view/${article._id}/full`} key={article._id}>
            <div className="pb-4 hover:shadow-2xl transition duration-300 transform hover:scale-105 rounded">
              {article.image && (
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-64 object-cover rounded"
                  loading="lazy"
                />
              )}
              <div className="">

              <h3 className="text-lg font-semibold text-black px-4">{article.title}</h3>
              <p className="text-sm text-gray-500 px-4 line-clamp-3">{article.content || "No se añadió una descripción"}</p>
              </div>

            </div>
          </Link>
        ))}
      </Carousel>
    </div>
  );
};

export default PlayaCarousel;
