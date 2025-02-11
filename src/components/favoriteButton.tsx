"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

interface FavoriteButtonProps {
  articleId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ articleId }) => {
  const { data: session } = useSession();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    async function fetchFavorites() {
      if (session?.user) {
        const response = await fetch(`/api/favorites`);
        const data = await response.json();

        if (data.favorites.includes(articleId)) {
          setIsFavorite(true);
        }
      }
    }
    fetchFavorites();
  }, [session, articleId]);

  const toggleFavorite = async () => {
    if (!session) return alert("Debes iniciar sesión para guardar favoritos");

    const response = await fetch(`/api/favorites`, {
      method: "POST",
      body: JSON.stringify({ articleId }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      setIsFavorite((prev) => !prev);
    } else {
      console.error("Error al actualizar favoritos");
    }
  };

  return (
    <Button
      onClick={toggleFavorite}
      className={`py-2 px-4 rounded-lg shadow-md ${isFavorite ? "bg-red-500" : "bg-gray-500"} text-white`}
    >
      {isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
    </Button>
  );
};

export default FavoriteButton;
