"use client";

import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/Carousel";
import Image from 'next/image';

const events = [
  {
    title: "HallacaFest",
    date: "25 dic - 29 dic",
    month: "diciembre",
    image: "/images/hallacafest.jpg",
  },
  {
    title: "Gaitazo",
    date: "31 de diciembre",
    month: "diciembre",
    image: "/images/gaitazo.jpg",
  },
  {
    title: "Karaoke Casco Colonial",
    date: "10 dic - 16 dic",
    month: "diciembre",
    image: "/images/karaoke.jpg",
  },
  {
    title: "Oferta de cervezas",
    date: "02 dic - 24 dic",
    month: "diciembre",
    image: "/images/cervezas.jpg",
  },
  {
    title: "Fiesta de Año Nuevo",
    date: "01 ene",
    month: "enero",
    image: "/images/nuevov.jpg",
  }
];

const months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

export default function EventCarousel() {
  const [selectedMonth, setSelectedMonth] = useState("diciembre");

  const filteredEvents = events.filter(event => event.month === selectedMonth);

  return (
    <div>
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800">Selecciona un mes</h2>
        <select 
          className="mt-2 p-2 border rounded-md" 
          value={selectedMonth} 
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          {months.map((month) => (
            <option key={month} value={month}>{month.charAt(0).toUpperCase() + month.slice(1)}</option>
          ))}
        </select>
      </div>
      <Carousel>
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-800">Eventos en {selectedMonth.charAt(0).toUpperCase() + selectedMonth.slice(1)}</h2>
        </div>
        <CarouselContent>
          {filteredEvents.map((event, index) => (
            <CarouselItem key={index} className="w-full sm:basis-1/2 lg:basis-1/3">
              <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg">
                <div className="relative">
                  <Image
                    src={event.image}
                    alt={event.title}
                    width={400}
                    height={300}
                    className="object-cover w-full h-[200px]"
                  />
                  <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 text-gray-800"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                      />
                    </svg>
                  </button>
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-bold text-gray-800">{event.title}</h2>
                  <p className="text-gray-600">{event.date}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
