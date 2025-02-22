import { connectDB } from "@/libs/mongodb";
import News from "@/models/news";
import Link from "next/link";

async function HomePage() {
  await connectDB(); 

  const newsArticles = await News.find({});

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 pt-8">
        {newsArticles.map((article) => (
          <Link href={`/view/${article._id}/full`} key={article._id}>
            <div className="p-4 rounded hover:shadow-lg  transition duration-300 transform hover:scale-105">
              <img src={article.image}
               alt={article.title}
                className="w-full h-64 object-cover"
                loading = "lazy" />
              <p className="text-xs">
                {article.category}
              </p>
              <h2 className="text-2xl font-semibold text-black line-clamp-2">{article.title}</h2>
              <p className="text-xs text-gray-500 pb-2">Author: {article.author}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;