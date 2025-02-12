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
              <p className="text-gray-600 mt-2">{item.description}</p>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:text-amber-600 font-semibold underline inline-block"
              >
                Ver más
              </a>
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
