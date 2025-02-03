// app/Prueba/page.tsx
import { connectDB } from "@/libs/mongodb";
import News from "@/models/news";
import NewsList from "@/components/NewsList";
import TikTokCarousel from "@/components/Tiktok"; // Importamos el componente de TikTok
import CarouselDate from "@/components/CarouselDate";
import PlayaCarousel from "@/components/PlayaCarousel";

async function PruebaPage() {
  await connectDB();

  // Obtener todas las noticias de la base de datos
  const newsArticles = await News.find({});

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Prueba - Filtro de Noticias</h1>
      <p className="text-gray-600 mb-6">Bienvenido a NiceTrip</p>

      {/* Aquí mostramos el componente NewsList pasando las noticias */}
      <NewsList newsArticles={newsArticles} />

      {/* Carrusel de TikToks */}
      <TikTokCarousel />

      {/* Carousel con filtro de fechas */}
      <CarouselDate newsArticles={newsArticles} />

      {/* Carousel con filtro de fechas */}
      <PlayaCarousel newsArticles={newsArticles} />


    </div>
  );
}

export default PruebaPage;
