import { Badge } from "@/components/ui/badge";
import { connectDB } from "@/libs/mongodb";
import News from "@/models/news";
import TikTokEmbed from "@/components/TikTokEmbed";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Deletebutton } from "@/components/Deletebutton";

interface Props {
  params: { _id: string };
}

async function Fullarticle({ params }: Props) {
  await connectDB();

  const article = await News.findOne({ _id: params._id });

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
        <p className="text-lg font-semibold text-gray-800">Article not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">

      {/* Titulo del Articulo */}
      <h2 className="text-3xl font-bold text-gray-900 mb-4">{article.title}</h2>

      {/* Contenido del Articulo */}
      <p className="text-lg text-gray-700 mb-6">{article.content}</p>

      {/* Categoría y Autor */}
      <div className="flex items-center gap-3 mb-6">
        <Badge className="text-sm px-3 py-1 bg-blue-100 text-blue-800 rounded-full">{article.category}</Badge>
        <span className="text-sm text-gray-500">Author: {article.author}</span>
      </div>

      {/* Imagen del Articulo */}
      {article.image && (
        <img
          src={article.image}
          alt="Article Image"
          className="w-full max-h-96 object-cover rounded-xl shadow-md mb-6"
        />
      )}

      {/* Video de YouTube */}
      {article.youtube && (
        <iframe
          className="w-full aspect-video rounded-lg mb-6 shadow-lg"
          src={article.youtube}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      )}

      {/* Embed de TikTok */}
      {article.tiktok && (
        <div className="mb-6">
          <TikTokEmbed url={article.tiktok} />
        </div>
      )}

      {/* Botones de Editar y Eliminar */}
      <div className="flex justify-between items-center mt-6">
        <Link
          href={`/view/${article._id}/edit?title=${article.title}&content=${article.content}&category=${article.category}&image=${article.image}&youtube=${article.youtube}&tiktok=${article.tiktok}`}
        >
          <Button className="bg-blue-500 hover:bg-blue-600 text-white shadow-md py-2 px-4 rounded-lg">
            Editar
          </Button>
        </Link>
        <Deletebutton articleId={article._id.toString()} />
      </div>
    </div>
  );
}

export default Fullarticle;
