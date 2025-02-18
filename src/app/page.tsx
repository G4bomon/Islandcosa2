import { connectDB } from "@/libs/mongodb";
import News from "@/models/news";
import NewsList from "@/components/NewsList";
import TikTokCarousel from "@/components/Tiktok";
import CarouselDate from "@/components/CarouselDate";
import PlayaCarousel from "@/components/PlayaCarousel";
import BigCarousel from "@/components/BigCarousel";
import CollageCarousel from "@/components/CollageCarousel";


async function PruebaPage() {
  await connectDB();

  // Obtener todas las noticias de la base de datos y convertirlas en objetos planos
  const newsData = await News.find({});
  const newsArticles = newsData.map((doc) => JSON.parse(JSON.stringify(doc)));

  // Seleccionar los últimos 3 artículos
  const lastThreeArticles = newsArticles.slice(-3).map((article) => ({
    id: article._id,
    title: article.title,
    articleId: article._id,
  }));

  return (
    <div className="p-4">


      <BigCarousel />

      {/* Los otros componentes */}
      <NewsList newsArticles={newsArticles} />
      <CollageCarousel />
      <TikTokCarousel />
      <CarouselDate newsArticles={newsArticles} />
      <PlayaCarousel newsArticles={newsArticles} />
    </div>
  );
}

export default PruebaPage;
