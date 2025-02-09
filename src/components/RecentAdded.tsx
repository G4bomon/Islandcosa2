import { connectDB } from "@/libs/mongodb";
import News from "@/models/news";
import CarouselDate from "@/components/CarouselDate";

async function RecentAdded() {
  await connectDB();

  // Obtener todas las noticias de la base de datos y convertirlas en objetos planos
  const newsData = await News.find({});
  const newsArticles = newsData.map(doc => JSON.parse(JSON.stringify(doc)));
  return (
    <div className="p-4">
      <CarouselDate newsArticles={newsArticles} />
    </div>
  );
}

export default RecentAdded;
