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
  const [isMenuVisible, setIsMenuVisible] = useState(false); // Estado para controlar la visibilidad del menú

  // Mostrar las notificaciones cuando un nuevo artículo sea recibido
  useEffect(() => {
    if (newArticles.length > 0) {
      setVisibleNotifications(newArticles); // Establece las notificaciones visibles
      // Ocultar las notificaciones después de un día (24 horas)
      const timer = setTimeout(() => {
        setVisibleNotifications([]); // Limpiar las notificaciones después de 24 horas
      }, 86400000); // 24 horas en milisegundos

      return () => clearTimeout(timer); // Limpiar el timer al desmontar
    }
  }, [newArticles]);

  // Función para alternar la visibilidad del menú
  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* Icono de campana estático */}
      <div className="relative cursor-pointer" onClick={toggleMenu}>
        <div className="bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition-all duration-300">
          {/* Ícono de campana con estilo */}
          <span className="text-2xl">🔔</span>
        </div>
        {visibleNotifications.length > 0 && (
          <div className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2 py-1">
            {visibleNotifications.length}
          </div>
        )}
      </div>

      {/* Menú de notificaciones */}
      {isMenuVisible && visibleNotifications.length > 0 && (
        <div className="bg-white border border-gray-300 rounded-lg shadow-lg mt-2 w-64 p-4">
          <p className="font-semibold text-lg mb-3">Notificaciones Recientes</p>
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
        </div>
      )}
    </div>
  );
};

export default Notifications;
