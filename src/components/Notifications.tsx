"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

// Interfaz de un artículo de notificación
interface Notification {
  id: string;
  title: string;
  articleId: string; // ID del artículo para la redirección
}

const Notifications: React.FC<{ newArticles: Notification[] }> = ({ newArticles }) => {
  const [visibleNotifications, setVisibleNotifications] = useState<Notification[]>([]);

  // Mostrar las notificaciones cuando un nuevo artículo sea recibido
  useEffect(() => {
    if (newArticles.length > 0) {
      setVisibleNotifications(newArticles); // Establece las notificaciones visibles
      // Ocultar las notificaciones después de 15 segundos
      setTimeout(() => {
        setVisibleNotifications([]); // Limpiar las notificaciones después de un tiempo
      }, 15000);
    }
  }, [newArticles]);

  return (
    <div className="fixed top-4 right-4 z-50">
      {visibleNotifications.length > 0 && (
        <div className="space-y-2">
          {visibleNotifications.map((article) => (
            <Link href={`/view/${article.articleId}/full`} key={article.articleId}>
              <div className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg transition-all transform hover:scale-105 cursor-pointer">
                <p className="font-semibold">
                  Nuevo artículo agregado: {article.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
