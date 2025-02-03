"use client";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
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
      <div className="mb-4 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setCategoryFilter(category)}
            className={`px-4 py-2 rounded ${
              categoryFilter === category
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Carrusel de noticias */}
      <Carousel>
        {carouselArticles.map((article) => (
          <Link href={`/view/${article._id}/full`} key={article._id}>
            <div className="border p-4 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105">
              <h2 className="text-xl font-semibold text-blue-600">{article.title}</h2>
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

      {/* Botón "Ver más" */}
      {filteredArticles.length > 10 && (
        <div className="text-center mt-4">
          <button
            onClick={() => router.push(`/?category=${categoryFilter}`)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Ver más
          </button>
        </div>
      )}
    </div>
  );
};

export default NewsList;
