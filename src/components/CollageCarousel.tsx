"use client";

import React, { useState, MouseEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const items = [
  {
    images: ["/img/HOTEL1.jpg", "/img/HOTEL2.jpg", "/img/HOTEL3.jpg"],
    title: "Hotel VIP La Guaira",
    description: "Disfruta de una noche inolvidable en el mejor casino de la ciudad.",
    link: "https://www.booking.com/hotel/ve/vip-la-guaira.es.html",
  },
  {
    images: ["/img/PLAYA1.jpg", "/img/PLAYA2.jpg", "/img/PLAYA3.jpg"],
    title: "Día de Playa",
    description: "Relájate en las playas más hermosas del estado.",
    link: "https://vacacionesenlaguaira.com/cuales-son-las-mejores-playas-de-la-guaira/",
  },
  {
    images: ["/img/SANJUAN1.jpeg", "/img/SANJUAN2.jpg", "/img/SANJUAN3.jpg"],
    title: "Celebra San Juan en La Guaira",
    description: "No te pierdas de los mejores tambores venezolanos y del calor del Guaireño en este día.",
    link: "https://noticiaalminuto.com/el-to-lo-tiene-y-to-lo-da-devocion-a-san-juan-bautista-el-unico-santo-al-que-le-celebran-su-cumpleanos/",
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
    <div className="relative w-full max-w-7xl mx-auto py-4 my-4">
      <div className="relative flex items-center">
        {items.map((item, index) => (
          <div
            key={index}
            className={`transition-opacity duration-700 ease-in-out flex items-center w-full ${
              index === currentIndex ? "opacity-100" : "opacity-0 absolute inset-0"
            }`}
          >
            {/* Contenedor de imágenes con alturas fijas para evitar cambios bruscos */}
            <div className="grid grid-cols-2 grid-rows-1 gap-4 w-full h-64 sm:h-72 md:h-80 lg:h-96">
              {/* Imagen principal grande */}
              <div className="col-span-1">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-full h-full object-cover rounded-lg shadow-lg transform hover:scale-105 transition-transform"
                />
              </div>

              {/* Imágenes secundarias */}
              <div className="flex flex-col justify-between col-span-1 space-y-2">
                <img
                  src={item.images[1]}
                  alt={item.title}
                  className="w-full h-1/2 object-cover rounded-lg shadow-lg transform hover:scale-105 transition-transform"
                />
                <img
                  src={item.images[2]}
                  alt={item.title}
                  className="w-full h-1/2 object-cover rounded-lg shadow-lg transform hover:scale-105 transition-transform"
                />
              </div>
            </div>

            {/* Contenido descriptivo */}
            <div className="w-1/2 pl-6 flex flex-col justify-between h-64 sm:h-72 md:h-80 lg:h-96">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{item.title}</h2>
                <p className="text-gray-600 mb-4 line-clamp-3">{item.description}</p>
              </div>

              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-semibold transition-colors underline mt-4 inline-block"
              >
                Ver más
              </a>
            </div>
          </div>
        ))}

        {/* Botones de navegación */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 -translate-y-1/2 left-4 p-4 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition z-50"
        >
          <ChevronLeft size={32} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 -translate-y-1/2 right-4 p-4 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition z-50"
        >
          <ChevronRight size={32} />
        </button>
      </div>
    </div>
  );
};

export default CollageCarousel;
