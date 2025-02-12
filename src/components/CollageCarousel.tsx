"use client";

import React, { useState, MouseEvent } from "react";
import { ChevronLeft, ChevronRight,} from "lucide-react";
import Link from "next/link";

const items = [
  {
    images: ["/img/HOTEL1.jpg", "/img/HOTEL2.jpg", "/img/HOTEL3.jpg"],
    title: "Hotel VIP La Guaira",
    description: "VIP Hotel ofrece una experiencia única en una de las zonas más vibrantes y caribeñas del país.",
    link: "/view/67ac17f2aa6ce0ce513647a8/full",
  },
  {
    images: ["/img/PLAYA1.jpg", "/img/PLAYA2.jpg", "/img/PLAYA3.jpg"],
    title: "Día de Playa",
    description: "Desde tranquilos rincones como Playa Pantaleta hasta la animada atmósfera del Día de los Inocentes en Chuspa, cada lugar ofrece una experiencia singular. Con más de un litoral cautivador, este destino te invita a disfrutar de momentos inolvidables en un entorno idílico.",
    link: "/view/67ac1eb4aa6ce0ce51364812/full",
  },
  {
    images: ["/img/SANJUAN1.jpeg", "/img/SANJUAN2.jpg", "/img/SANJUAN3.jpg"],
    title: "Si San Juan lo tiene, ¡ San Juan te lo da !",
    description: "El día 23 de junio se celebra la verbena de San Juan. Es la noche más corta del año y también una de las más mágicas, en la que se encienden hogueras en las plazas y las playas de los pueblos para celebrar la llegada del verano.",
    link: "/view/67ac2123aa6ce0ce5136483d/full",
  },
];

const CollageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1));
  };

  const nextSlide = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto py-4 my-4 sm:h-[500px] h-[640px]">
      <div className="relative flex items-center h-full">
        {items.map((item, index) => (
          <div
            key={index}
            className={`flex h-full flex-col md:flex-row transition-opacity duration-700 ease-in-out w-full ${index === currentIndex ? "opacity-100" : "hidden opacity-0"
              }`}
          >
            {/* Contenedor de imágenes con grid adaptable */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full h-auto">
              {/* Imagen principal grande */}
              <div>
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-full sm:h-full max-h-[458px] object-cover rounded-tl-3xl shadow-lg"
                />
              </div>

              {/* Imágenes secundarias */}
              <div className="grid grid-cols-2 sm:grid-cols-1 gap-2 ">
                <img
                  src={item.images[1]}
                  alt={item.title}
                  className="w-full md:h-full sm:h-1/2 object-cover shadow-lg max-h-[220px]"
                />
                <img
                  src={item.images[2]}
                  alt={item.title}
                  className="w-full md:h-full sm:h-1/2 object-cover shadow-lg max-h-[220px]"
                />
              </div>
            </div>

            {/* Contenido descriptivo (apilado en mobile) */}
            <div className="md:flex md:flex-col md:justify-center w-full sm:w-1/2 px-4 py-4 sm:py-0">
              <h2 className="text-xl sm:text-3xl font-bold text-gray-900">{item.title}</h2>
              <p className="text-gray-600 mt-2 line-clamp-3">{item.description}</p>
              <Link
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:text-amber-600 font-semibold underline inline-block"
              >
                Ver más
              </Link>
            </div>
          </div>
        ))}

        {/* Botones de navegación */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 -translate-y-1/2 left-4 p-3 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition z-50"
        >
          <ChevronLeft size={28} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 -translate-y-1/2 right-4 p-3 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition z-50"
        >
          <ChevronRight size={28} />
        </button>
      </div>
    </div>

  );
};

export default CollageCarousel;
