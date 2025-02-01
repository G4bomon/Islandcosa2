"use client";
import { useEffect, useState } from "react";

function NotificationBell() {
  const [notifications, setNotifications] = useState<string[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const eventSource = new EventSource("/api/notifications");

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("Notificación recibida:", data); // Debug en la consola

        if (data.title) {
          setNotifications((prev) => [...prev, data.title]);
        }
      } catch (e) {
        console.error("Error al procesar la notificación:", e);
      }
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div className="">
      {/* Icono de campana */}
      <button onClick={() => setMenuOpen(!menuOpen)} className="">
        🔔
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded-full">
            {notifications.length}
          </span>
        )}
      </button>

      {/* Menú desplegable */}
      {menuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-2">
          <h4 className="text-sm font-semibold">Notificaciones</h4>
          {notifications.length > 0 ? (
            <ul>
              {notifications.map((title, index) => (
                <li key={index} className="text-xs p-1 border-b">
                  {title}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-gray-500">No hay nuevas notificaciones</p>
          )}
        </div>
      )}
    </div>
  );
}

export default NotificationBell;
