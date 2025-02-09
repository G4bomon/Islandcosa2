import { connectDB } from "@/libs/mongodb";
import News from "@/models/news";
import Nav from "@/components/Nav";
import Logo from "@/components/Logo";

async function fetchNewsArticles() {
  await connectDB();
  const newsData = await News.find({});
  return newsData.map(doc => JSON.parse(JSON.stringify(doc)));
}

const Header = async () => {
  const newsArticles = await fetchNewsArticles(); // Cargar los artículos desde la base de datos

  return (
    <header className="bg-[rgba(221,234,255,0.5)] z-20 mx-auto flex flex-wrap justify-between md:justify-normal border-b-2 border-amber-400 pt-2 px-2 w-full">
        <Logo />
        {/* Pasa los newsArticles a Nav */}
        <Nav newsArticles={newsArticles} />
    </header>
  );
};

export default Header;
