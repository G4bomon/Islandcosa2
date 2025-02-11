"use client"

import FavoriteButton from "@/components/favoriteButton";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";

const ArticleButton = () => {
  const { data: session } = useSession();

  return (
    <div className="flex">
      {session && session.user?.admin ? (
        <Link href={"/article"}>
        <Button>
          Crear Articulo
        </Button>
        </Link>
      ) : null
      }
      {/* {session && <FavoriteButton articleId={id} />} */}
    </div>
    
  );
};

export default ArticleButton;
