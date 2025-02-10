"use client"

import Form from "@/app/article/create"
import { useSession } from "next-auth/react";
export default function NewsForm() {
  const { data: session, status } = useSession();
 
   if (status === "loading") {
     return <p>Cargando...</p>;
   }
 
   if (!session || !session.user?.admin) {
     return <p className="text-red-500 font-bold text-center text-xl">Error 401, no deberías estar aquí</p>;
   }

    return <Form/>;
}