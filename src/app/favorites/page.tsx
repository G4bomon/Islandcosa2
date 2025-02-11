import { Badge } from "@/components/ui/badge";
import { connectDB } from "@/libs/mongodb";
import News from "@/models/news";
import User from "@/models/user";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import Navbar from "@/components/navbar";

export default async function FavoritesPage() {
  const session = await getServerSession(authOptions);
  if (!session) return <p className="text-center text-red-500">Debes iniciar sesión para ver tus favoritos.</p>;

  await connectDB();

  // Obtener usuario y sus favoritos
  const user = await User.findOne({ email: session.user.email });
  if (!user || !user.favorites.length) return <p className="text-center text-gray-500">No tienes artículos en favoritos.</p>;

  // Obtener los artículos favoritos
  const favoriteArticles = await News.find({ _id: { $in: user.favorites } });

  return (
    <div>
      <Navbar />
      <h1 className="text-2xl font-bold text-center my-4">Mis Favoritos</h1>
      <div className="grid grid-cols-3 gap-4 pt-8">
        {favoriteArticles.map((article) => (
          <Link href={`/view/${article._id}/full`} key={article._id}>
            <div className="border p-4 rounded-lg shadow-md hover:shadow-lg transition">
              <h2 className="text-xl font-bold">{article.title}</h2>
              <p className="text-sm text-gray-500">Autor: {article.author}</p>
              <p className="text-sm text-gray-400">
                Publicado el: {new Date(article.date).toLocaleDateString("es-ES")}
              </p>
              <Badge>{article.category}</Badge>
              {article.image && <img src={article.image} alt={article.title} className="w-full h-40 object-cover mt-2 rounded-md" />}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
