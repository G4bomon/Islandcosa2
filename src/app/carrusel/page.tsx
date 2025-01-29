import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/Carousel"

import Image from 'next/image';


export default function CarouselK() {
  return (
    // 50% on small screens and 33% on larger screens.
    <Carousel>
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800">Planes en Familia</h2>
      </div>
      <CarouselContent>
        <CarouselItem className="w-full sm:basis-1/2 lg:basis-1/3">
          <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg">
            {/* Image Section */}
            <div className="relative">
              <Image
                src="/images/caidalibre.jpg" // Replace with your image path
                alt="Caída libre"
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
            {/* Text Section */}
            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-800">Platanazo</h2>
              <p className="text-gray-600">Tírate con tus amigos</p>
            </div>
          </div></CarouselItem>
        <CarouselItem className="w-full sm:basis-1/2 lg:basis-1/3"><div className="max-w-sm rounded-2xl overflow-hidden shadow-lg">
          {/* Image Section */}
          <div className="relative">
            <Image
              src="/images/caidalibre2.jpg" // Replace with your image path
              alt="Caída libre"
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
          {/* Text Section */}
          <div className="p-4">
            <h2 className="text-xl font-bold text-gray-800">Caída libre</h2>
            <p className="text-gray-600">Se parece al platanazo</p>
          </div>
        </div></CarouselItem>
        <CarouselItem className="w-full sm:basis-1/2 lg:basis-1/3"><div className="max-w-sm rounded-2xl overflow-hidden shadow-lg">
          {/* Image Section */}
          <div className="relative">
            <Image
              src="/images/anchoas.jpg" // Replace with your image path
              alt="Caída libre"
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
          {/* Text Section */}
          <div className="p-4">
            <h2 className="text-xl font-bold text-gray-800">Nado con anchoas</h2>
            <p className="text-gray-600">Lleva tus mejores shorts</p>
          </div>
        </div></CarouselItem>
        <CarouselItem className="w-full sm:basis-1/2 lg:basis-1/3"><div className="max-w-sm rounded-2xl overflow-hidden shadow-lg">
          {/* Image Section */}
          <div className="relative">
            <Image
              src="/images/lancha.jpg" // Replace with your image path
              alt="Caída libre"
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
          {/* Text Section */}
          <div className="p-4">
            <h2 className="text-xl font-bold text-gray-800">Lanchapiruetas</h2>
            <p className="text-gray-600">Prepárate para una experiencia inolvidable</p>
          </div>
        </div></CarouselItem>
        <CarouselItem className="w-full sm:basis-1/2 lg:basis-1/3"><div className="max-w-sm rounded-2xl overflow-hidden shadow-lg">
          {/* Image Section */}
          <div className="relative">
            <Image
              src="/images/cinta.jpg" // Replace with your image path
              alt="Caída libre"
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
          {/* Text Section */}
          <div className="p-4">
            <h2 className="text-xl font-bold text-gray-800">Cinta Costera</h2>
            <p className="text-gray-600">Camino de la locura</p>
          </div>
        </div></CarouselItem>
        <CarouselItem className="w-full sm:basis-1/2 lg:basis-1/3"><div className="max-w-sm rounded-2xl overflow-hidden shadow-lg">
          {/* Image Section */}
          <div className="relative">
            <Image
              src="/images/malecon.jpg" // Replace with your image path
              alt="Caída libre"
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
          {/* Text Section */}
          <div className="p-4">
            <h2 className="text-xl font-bold text-gray-800">Malecon</h2>
            <p className="text-gray-600">Lit un malecon</p>
          </div>
        </div></CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}