import BackButton from "@/components/BackButton";
import { Badge } from "@/components/ui/badge";
import { connectDB } from "@/libs/mongodb";
import News from "@/models/news";
import Link from "next/link";
import Image from "next/image";

interface SearchPageProps {
  params: { busqueda: string };
}

export default async function SearchPage({ params }: SearchPageProps) {
  const searchQuery = decodeURIComponent(params.busqueda).trim();

  await connectDB();

  const articles = await News.find({
    title: { $regex: searchQuery, $options: "i" }, 
  });

  if (!articles.length) {
    return (
      <p className="text-center text-gray-500">
        No se encontraron artículos para: {searchQuery}.
      </p>
    );
  }

  return (
    <div>
      <BackButton />
      <h1 className="text-2xl font-bold text-center my-4">
        Resultados de búsqueda para: {searchQuery}
      </h1>
      <div className="grid md:grid-cols-3 gap-4 pt-8">
        {articles.map((article) => (
          <Link href={`/view/${article._id}/full`} key={article._id}>
            <div className="p-4 rounded hover:shadow-lg transition duration-300 transform">
              {article.image && (
                <Image
                  src={article.image}
                  alt={article.title}
                  width={500} // Ajusta el tamaño según sea necesario
                  height={300}
                  className="w-full h-64 object-cover"
                />
              )}
              <Badge className="mt-2 bg-amber-400 text-white">
                {article.category}
              </Badge>
              <h2 className="text-2xl font-semibold text-black line-clamp-2">
                {article.title}
              </h2>
              <p className="text-xs text-gray-500 pb-2">
                Autor: {article.author || "Desconocido"}
              </p>
              <p className="text-sm text-gray-400">
                Publicado el: {new Date(article.date).toLocaleDateString("es-ES")}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
