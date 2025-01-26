"use client";
import React, { useState } from "react";

interface CarouselProps {
  children: React.ReactNode[]; // Las tarjetas que se mostrarán
}

const Carousel: React.FC<CarouselProps> = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsToShow = 3; // Mostrar 3 ítems a la vez

  const nextSlide = () => {
    if (currentIndex < children.length - itemsToShow) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="relative w-full">
      {/* Botón Anterior */}
      <button
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white hover:bg-blue-700 p-3 rounded-full shadow-lg z-10"
          onClick={prevSlide}
        >
          ◀
        </button>

{/* Carrusel */}
<div className="overflow-hidden border rounded-lg shadow-md">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`,
          }}
        >
          {children.map((child, index) => (
            <div
              key={index}
              className="w-1/3 flex-shrink-0 p-4 md:w-1/4 lg:w-1/5" // Ajuste para responsividad
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Botón Siguiente */}
      {currentIndex < children.length - itemsToShow && (
        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white hover:bg-blue-700 p-3 rounded-full shadow-lg z-10"
          onClick={nextSlide}
        >
          ▶
        </button>
      )}
    </div>
  );
};

export default Carousel;
