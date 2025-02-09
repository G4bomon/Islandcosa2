"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps {
  children: React.ReactNode[]; // Las tarjetas que se mostrarán
}

const Carousel: React.FC<CarouselProps> = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(4); // Default en desktop

  useEffect(() => {
    const updateItemsToShow = () => {
      if (window.innerWidth < 768) {
        setItemsToShow(Math.min(children.length, 2)); // En móviles, mostrar 2
      } else if (window.innerWidth >= 768 && window.innerWidth < 900)
        {
          setItemsToShow(Math.min(children.length, 3)); // Entre 768px y 899px, mostrar 3
        }
      else {
        setItemsToShow(Math.min(children.length, 4)); // En desktop +900, mostrar 4
      }
    };

    updateItemsToShow();
    window.addEventListener("resize", updateItemsToShow);
    
    return () => window.removeEventListener("resize", updateItemsToShow);
  }, [children.length]);


  
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
      {currentIndex > 0 && (
        <button
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white hover:bg-amber-400 p-3 rounded-full border z-10"
          onClick={prevSlide}
        >
          <ChevronLeft className="text-black" size={24}/>
        </button>
      )}

      {/* Carrusel */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)` }}
        >
          {children.map((child, index) => (
            <div key={index} className="w-1/2 md:w-1/3 lg:w-1/4 flex-shrink-0 p-4 pt-0">
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Botón Siguiente */}
      {currentIndex < children.length - itemsToShow && (
        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white hover:bg-amber-400 p-3 rounded-full border z-10"
          onClick={nextSlide}
        >
          <ChevronRight className="text-black" size={24}/>
        </button>
      )}
    </div>
  );
};

export default Carousel;
