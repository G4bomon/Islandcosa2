"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  {
    src: "/img/CASINO.jpg",
    title: "CASINO VIP LA GUAIRA",
    link: "https://hotelviplaguaira.com"
  },
  {
    src: "/img/cintacostera.jpg",
    title: "VISITA LA CINTA COSTERA",
    link: "https://redradiove.com/ya-puede-ir-a-disfrutar-de-la-noria-el-ojo-de-la-guaira-en-la-cinta-costera/"
  },
  {
    src: "/img/CINEX.jpg",
    title: "NUEVO CINEX EN SOTAVENTO",
    link: "https://www.eluniversal.com/venezuela/142471/despues-20-anos-estrenaran-dos-salas-de-cine-en-el-estado-la-guaira"
  },
];

const BigCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      <div className="relative h-48 sm:h-64 md:h-72 lg:h-80 xl:h-96">
        {images.map((image, index) => (
          <a
            key={index}
            href={image.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image.src}
              alt={image.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <h2 className="text-white text-2xl md:text-4xl font-bold shadow-lg">
                {image.title}
              </h2>
            </div>
          </a>
        ))}
      </div>

      {/* Botones de navegación */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition"
      >
        <ChevronRight size={24} />
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default BigCarousel;
