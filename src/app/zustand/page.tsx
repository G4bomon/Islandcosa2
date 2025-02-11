"use client"

import FavoriteButton from "@/components/favoriteButton";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";

const MyComponent = () => {
  const { data: session } = useSession();

  return (
    <div>
      {session && session.user?.admin ? (
        <Link href={"/article"}>
        <Button>
          crear aticulo
        </Button>
        </Link>
      ) : null
      }
      {/* {session && <FavoriteButton articleId={id} />} */}
    </div>
    
  );
};

export default MyComponent;
