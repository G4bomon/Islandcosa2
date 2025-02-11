"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { Heart} from "lucide-react";

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
    <button
      key={isFavorite ? "favorite" : "not-favorite"}
      onClick={toggleFavorite}
      className={`absolute top-4 right-4 p-3 rounded-full shadow-md flex items-center justify-center transition-colors z-999 
        ${isFavorite ? "bg-red-800" : "bg-red-500"} text-white hover:bg-red-800`}
    >
      <Heart className="w-6 h-6" />
    </button>
  );
};

export default FavoriteButton;
