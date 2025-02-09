"use client";
import { useState } from "react";
import Link from "next/link";
import Carousel from "@/components/Carousel";
import { useRouter } from "next/navigation";


const NewsList: React.FC<{ newsArticles: any[] }> = ({ newsArticles }) => {
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const router = useRouter();

  // Obtener las categorías únicas
  const categories = ["All", ...new Set(newsArticles.map((article) => article.category))];

  // Filtrar las noticias según la categoría seleccionada
  const filteredArticles =
    categoryFilter === "All"
      ? newsArticles
      : newsArticles.filter((article) => article.category === categoryFilter);

  // Limitar a un máximo de 10 elementos en el carrusel
  const carouselArticles = filteredArticles.slice(0, 10);

  return (
    <div className="pt-8">
      {/* Botones para las categorías */}
      <div className="mb-4 flex flex-col gap-2">
        <h2 className="font-semibold text-2xl pl-4 pb-2">
          Descubra más cosas que hacer
        </h2>
        <div className="flex gap-3 flex-wrap px-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setCategoryFilter(category)}
              className={`px-4 py-2 rounded-xl ${categoryFilter === category
                ? "bg-amber-400 text-black font-medium"
                : "bg-gray-200 text-black font-medium hover:bg-gray-300"
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Carrusel de noticias */}
      <Carousel>
        {carouselArticles.map((article) => (
          <Link href={`/view/${article._id}/full`} key={article._id}>
            <div className= "p-4 rounded hover:shadow-lg  transition duration-300 transform hover:scale-105">
              {article.image && (
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-64 object-cover my-4"
                  loading="lazy"
                />
              )}
              <p className="text-xs">
                {article.category}
              </p>
              <h2 className="text-2xl font-semibold text-black line-clamp-2">{article.title}</h2>
              <p className="text-xs text-gray-500 pb-2">Autor: {article.author || "Desconocido"}</p>
              <p className="text-sm text-gray-500 line-clamp-2">{article.content || "No se añadió una descripción"}</p>
            </div>
          </Link>
        ))}
      </Carousel>

      {/* Botón "Ver más" */}
      {filteredArticles.length > 10 && (
        <div className="md:mt-2 pl-4">
          <button
            onClick={() => router.push(`/?category=${categoryFilter}`)}
            className="px-6 py-3 bg-[rgba(221,234,255,0.5)] text-black font-medium rounded-lg hover:bg-amber-400 transition"
          >
            Ver más
          </button>
        </div>
      )}
    </div>
  );
};

export default NewsList;
