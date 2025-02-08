import { connectDB } from "@/libs/mongodb";
import News from "@/models/news";
import NewsList from "@/components/NewsList";

async function MoreToDo() {
  await connectDB();

  // Get all news from database and convert to plain objects
  const newsData = await News.find({});
  // Convert Mongoose documents to plain JavaScript objects
  const newsArticles = newsData.map(doc => JSON.parse(JSON.stringify(doc)));

  return (
    <div className="p-2">
      {/* Pass the converted plain objects to components */}
      <NewsList newsArticles={newsArticles} />
    </div>
  );
}

export default MoreToDo;