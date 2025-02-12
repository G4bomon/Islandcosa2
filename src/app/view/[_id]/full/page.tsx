"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Deletebutton } from "@/components/Deletebutton";
import { useEffect, useState } from "react";
import { useNewsStore } from "@/app/store";
import TikTokEmbed from "@/components/TikTokEmbed";
import { use } from 'react';
import { useSession } from "next-auth/react";
import Scroll from "@/components/ScrollUp"
import FavoriteButton from "@/components/favoriteButton";
import BackButton from "@/components/BackButton";

interface Props {
  params: Promise<{ _id: string }>;
}

function Fullarticle({ params }: Props) {
  const resolvedParams = use(params);
  const [isLoading, setIsLoading] = useState(true);
  const { setArticle, id, title, content, category, author, image, youtube, tiktok } = useNewsStore();
  const { data: session } = useSession();

  useEffect(() => {
    async function loadArticle() {
      try {
        const response = await fetch(`/api/articles/${resolvedParams._id}`);
        const article = await response.json();

        if (article) {
          const articleData = {
            id: article._id.toString(),
            title: article.title || '',
            content: article.content || '',
            category: article.category || '',
            author: article.author || '',
            image: article.image || '',
            youtube: article.youtube || '',
            tiktok: article.tiktok || ''
          };

          setArticle(articleData);
        }
      } catch (error) {
        console.error("Error al cargar el artículo:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadArticle();
  }, [resolvedParams._id, setArticle]);

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto mt-8 p-6 bg-white shadow-xl rounded-xl animate-pulse">
        <p className="text-lg font-semibold text-gray-800">Loading...</p>
      </div>
    );
  }

  if (!id) {
    return (
      <div className="max-w-6xl mx-auto mt-8 p-6 bg-white shadow-xl rounded-xl">
        <p className="text-lg font-semibold text-gray-800">Articulo no encontrado</p>
      </div>
    );
  }

  return (
    <>
      <BackButton/>
    <div className="max-w-6xl mx-auto mt-8 p-8 bg-gradient-to-r from-blue-50 to-white shadow-2xl rounded-xl flex flex-col gap-6 border border-gray-200">
      {/* Imagen del Articulo */}
      {image && (
        <div className="relative w-full overflow-hidden rounded-xl shadow-lg">
          <img src={image} alt="Imagen del artículo" className="w-full h-96 object-cover" />
          {session && <FavoriteButton articleId={id}/>}
        </div>
      )}
      {/* Titulo del Articulo */}
      <div className="text-center">
        <h2 className="text-5xl font-bold text-gray-900 leading-tight">{title}</h2>
      </div>

      {/* Categoría y Autor */}
      <div className="flex items-center justify-center gap-4 text-gray-600 text-sm">
        <Badge className="px-4 py-2 bg-amber-400 text-white rounded-full">{category}</Badge>
        <span className="text-gray-500">Por: {author}</span>
      </div>

      <div className="text-lg text-gray-700 leading-relaxed text-justify px-6 space-y-4">
        {content.split('\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>



      {/* Video de YouTube */}
      {youtube && (
        <div className="w-full flex justify-center">
          <iframe
            className="w-full md:w-4/5 aspect-video rounded-lg shadow-lg"
            src={youtube}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {/* Embed de TikTok */}
      {tiktok && (
        <div className="flex justify-center min-h-[320px]">
          <TikTokEmbed url={tiktok} />
        </div>
      )}
      
      {/* Botones de Editar y Eliminar */}
      {session && session.user?.admin ? (
        <div className="flex justify-between items-center mt-6">
          <Link href={`/view/${id}/edit`}>
            <Button className="bg-amber-400 hover:bg-black text-white shadow-md py-2 px-4 rounded-lg">
              Editar
            </Button>
          </Link>
          <Deletebutton articleId={id} />
        </div>
      ) : null}

      <Scroll/>

    </div>
    </>
  );
}

export default Fullarticle;