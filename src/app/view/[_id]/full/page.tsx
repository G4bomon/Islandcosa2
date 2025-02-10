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
      <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
        <p className="text-lg font-semibold text-gray-800">Loading...</p>
      </div>
    );
  }

  if (!id) {
    return (
      <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
        <p className="text-lg font-semibold text-gray-800">Article not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
      {/* Titulo del Articulo */}
      <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>

      {/* Contenido del Articulo */}
      <p className="text-lg text-gray-700 mb-6">{content}</p>

      {/* Categoría y Autor */}
      <div className="flex items-center gap-3 mb-6">
        <Badge className="text-sm px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
          {category}
        </Badge>
        <span className="text-sm text-gray-500">Author: {author}</span>
      </div>

      {/* Imagen del Articulo */}
      {image && (
        <img
          src={image}
          alt="Article Image"
          className="w-full max-h-96 object-cover rounded-xl shadow-md mb-6"
        />
      )}

      {/* Video de YouTube */}
      {youtube && (
        <iframe
          className="w-full aspect-video rounded-lg mb-6 shadow-lg"
          src={youtube}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      )}

      {/* Embed de TikTok */}
      {tiktok && (
        <div className="mb-6">
          <TikTokEmbed url={tiktok} />
        </div>
      )}

      {/* Botones de Editar y Eliminar */}
      {session && session.user?.admin ? (
        <div className="flex justify-between items-center mt-6">
        <Link href={`/view/${id}/edit`}>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white shadow-md py-2 px-4 rounded-lg">
            Editar
          </Button>
        </Link>
        <Deletebutton articleId={id} />
      </div>
      ) : null}
      
    </div>
  );
}

export default Fullarticle;