"use client";
import { useState, useEffect } from "react";
import { useSession, signOut, signIn } from "next-auth/react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { Menu, X, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/SearchBar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ArticleButton from "./ArticleButton";
const Nav = ({ newsArticles }: { newsArticles: any[] }) => {
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [showCards, setShowCards] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [notifications, setNotifications] = useState<any[]>([]);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    // Simulación de notificaciones, reemplaza con tu lógica de obtención de datos
    if (newsArticles.length > 0) {
      setNotifications(newsArticles.slice(-3));
    }
  }, [newsArticles]);

  const categories = [
    "All",
    ...new Set(newsArticles.map((article) => article.category)),
  ];

  const filteredArticles = newsArticles.filter((article) => {
    const matchesCategory =
      categoryFilter === "All" || article.category === categoryFilter;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.author?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleHomeButtonClick = () => {
    setCategoryFilter("All");
    setSearchQuery("");
    setShowCards(false);
  };

  const toggleNavbar = () => setIsOpen(!isOpen);

  return (
    <>

      {/*Hacer 2 divs, 1 div estructurado para la vista mobile, otro para la vista desktop
      Cada uno con su barra de navegacion con categorias, */}


      {/* vista móvil, aqui el input, campana y lo de inicio y registro*/}
      <div className="flex flex-col items-center md:hidden">
        <button onClick={toggleNavbar} className="p-2">
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {isOpen && (
        <div className="flex flex-col md:hidden w-full mb-2 p-2">
          <div className="top-side flex flex-col justify-between">
            <div className="my-2">
              <SearchBar
                searchQuery={searchQuery}
                onSearchChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowCards(true);
                }}
              />
            </div>
            <div className="inline-flex items-center flex-wrap my-2 w-full justify-between">
              <div className="flex w-full mb-1">
                {session ? (
                  <div className="inline-flex w-full">
                    <div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="bg-amber-400">
                            <Bell size={20} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                          <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          {notifications.length > 0 ? (
                            notifications.map((notif) => (
                              <DropdownMenuItem
                                key={notif._id}
                                onClick={() => router.push(`/view/${notif._id}/full`)}
                              >
                                {notif.title}
                              </DropdownMenuItem>
                            ))
                          ) : (
                            <DropdownMenuItem>No hay notificaciones</DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="mx-2 flex"> {/*vista registro e inicio sesion */}
                      <>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                              <p>{session.user?.fullname || "Profile"}</p>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>
                              {session.user?.email || "email"}
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => signOut()}>
                              Log out
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <Link
                          href="/favorites"
                          className="px-4 py-2 border rounded-lg bg-white mx-2 text-sm font-semibold"
                        >
                          Favoritos
                        </Link>
                        <ArticleButton/>
                      </>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <button
                      onClick={() => signIn()}
                      className="px-4 py-2 border rounded text-sm"
                    >
                      Iniciar Sesión
                    </button>
                    <Link
                      href="/register"
                      className="px-4 py-2 border rounded text-sm"
                    >
                      Registrarse
                    </Link>
                  </div>
                )}
                
              </div>
            </div>
          </div>
          <div className="bottom-side">
            <nav className="w-auto flex justify-end">
              <div className="w-full pt-8 mb-4 flex flex-col flex-wrap gap-2">
                <Link
                  href="#"
                  onClick={handleHomeButtonClick}
                  className="my-1 md:my-0 font-medium px-4 py-2 md:border-r border-amber-400 hover:bg-amber-400 hover:rounded-t-lg last:md:border-r-0"
                >
                  Inicio
                </Link>
                {categories.map((category) => (
                  <Link
                    key={category}
                    href="#"
                    onClick={() => {
                      setCategoryFilter(category);
                      setShowCards(true);
                    }}
                    className={`my-1 md:my-0 font-medium px-4 py-2 md:border-r border-amber-400 hover:bg-amber-400 hover:rounded-t-lg last:md:border-r-0 ${categoryFilter === category
                      ? "text-amber-600 font-bold"
                      : "text-gray-700 hover:bg-gray-200"
                      }`}
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* vista desktop, también está el input campana inicio y registro*/}
      <div className="hidden md:flex flex-col grow">
        <div className="top-side flex flex-auto justify-between w-full my-2">
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={(e) => {
              setSearchQuery(e.target.value);
              setShowCards(true);
            }}
          />
          <div className="ml-2 flex items-center">
            {session && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="relative">
                    <Bell size={20} />
                    {notifications.length > 0 && (
                      <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                        {notifications.length}
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {notifications.length > 0 ? (
                    notifications.map((notif) => (
                      <DropdownMenuItem
                        key={notif._id}
                        onClick={() => router.push(`/view/${notif._id}/full`)}
                      >
                        {notif.title}
                      </DropdownMenuItem>
                    ))
                  ) : (
                    <DropdownMenuItem>No hay notificaciones</DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <div className="ml-4 flex">
              {session ? (
                <>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        <p>{session.user?.fullname || "Profile"}</p>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>
                        {session.user?.email || "email"}
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => signOut()}>
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Link
                    href="/favorites"
                    className="px-4 py-2 border rounded-lg bg-white mx-2 text-sm font-semibold"
                  >
                    Favoritos
                  </Link>
                </>

              ) : (
                <div className="flex items-center">
                  <button
                    onClick={() => signIn()}
                    className="px-4 py-2 border rounded-lg"
                  >
                    Iniciar Sesión
                  </button>
                  <Link
                    href="/register"
                    className="px-4 py-2 border rounded-lg"
                  >
                    Registrarse
                  </Link>
                </div>
              )}
              <ArticleButton/>
            </div>
          </div>
        </div>
        <div className="bottom-side mx-2">
          <nav className="">
            <div className="w-full flex flex-wrap">
              <Link
                href="#"
                onClick={handleHomeButtonClick}
                className="my-1 md:my-0 font-medium px-4 py-2 md:border-r border-amber-400 hover:bg-amber-400 hover:rounded-t-lg last:md:border-r-0"
              >
                Inicio
              </Link>
              {categories.map((category) => (
                <Link
                  key={category}
                  href="#"
                  onClick={() => {
                    setCategoryFilter(category);
                    setShowCards(true);
                  }}
                  className={`my-1 md:my-0 font-medium px-4 py-2 md:border-r border-amber-400 hover:bg-amber-400 hover:rounded-t-lg last:md:border-r-0 ${categoryFilter === category
                    ? "text-amber-600 font-bold"
                    : "text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  {category}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>
      {/* Mostrar los artículos filtrados */}
      {showCards && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full mt-2 grow-0">
          {filteredArticles.map((article) => (
            <Link href={`/view/${article._id}/full`} key={article._id}>
              <div className="border p-4 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 sm:max-w-[280px] sm:min-w-[270px] md:min-w-[320px] transform mdhover:scale-105 bg-white">
                <h2 className="text-xl font-semibold text-amber-600 truncate">
                  {article.title}
                </h2>
                <p className="text-sm text-gray-500">
                  Autor: {article.author || "Desconocido"}
                </p>
                <Badge className="mt-2 bg-amber-400 text-white">
                  {article.category}
                </Badge>
                {article.image && (
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover mt-4 rounded-lg"
                    loading="lazy"
                  />
                )}
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Botón "Ver más" si hay más artículos */}
      {filteredArticles.length > 10 && showCards && (
        <div className="text-center mt-4">
          <button
            onClick={() => router.push(`/?category=${categoryFilter}`)}
            className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition"
          >
            Ver más
          </button>
        </div>
      )}
    </>
  );
};

export default Nav;
