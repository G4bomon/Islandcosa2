// app/Prueba/tiktok.tsx
import { connectDB } from "@/libs/mongodb";
import News from "@/models/news";
import Carousel from "@/components/Carousel";
import TikTokEmbed from "@/components/TikTokEmbed";

const TikTokCarousel: React.FC = async () => {
  await connectDB();

  // Obtener todas las noticias de la base de datos
  const newsArticles = await News.find({});

  // Filtrar solo los artículos que tengan un TikTok
  const tiktokClipsData = newsArticles
    .filter((article) => article.tiktok)
    .map((article) => ({
      _id: article._id,
      tiktok: article.tiktok,
    }));

  return (
    <div className="pt-8">
      {/* Carrusel de TikToks */}
      <Carousel>
        {tiktokClipsData.map((clip) => (
          <div key={clip._id} className="p-4">
            <TikTokEmbed url={clip.tiktok} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default TikTokCarousel;
