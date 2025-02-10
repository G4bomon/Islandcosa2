"use client";

import { useSession } from "next-auth/react";
import Edit2 from "./Edit2";

const AdminEditPage = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Cargando...</p>;
  }

  if (!session || !session.user?.admin) {
    return <p className="text-red-500 font-bold text-center text-xl">Error 401, no deberías estar aquí</p>;
  }

  return <Edit2 />;
};

export default AdminEditPage;
