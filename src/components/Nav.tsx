"use client";
import { useState } from "react";
import { useSession, signOut, signIn } from "next-auth/react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
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

const Nav = ({ newsArticles }: { newsArticles: any[] }) => {
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [showCards, setShowCards] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const router = useRouter();
  const { data: session } = useSession();

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
      {/* Barra de navegación con categorías */}
      <div className="pt-8 mb-4 flex flex-wrap gap-2">
        <Link
          href="#"
          onClick={handleHomeButtonClick}
          className="my-1 md:my-0 font-medium px-4 py-2 border-r border-amber-400 hover:bg-amber-400 hover:rounded-t-lg last:border-r-0"
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
            className={`my-1 md:my-0 font-medium px-4 py-2 border-r border-amber-400 hover:bg-amber-400 hover:rounded-t-lg last:border-r-0 ${
              categoryFilter === category
                ? "text-amber-600 font-bold"
                : "text-gray-700 hover:bg-gray-200"
            }`}
          >
            {category}
          </Link>
        ))}
      </div>

      {/* Mostrar los artículos filtrados */}
      {showCards && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredArticles.map((article) => (
            <Link href={`/view/${article._id}/full`} key={article._id}>
              <div className="border p-4 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105 bg-white">
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

      {/* Barra de navegación móvil */}
      <div className="flex flex-col items-center md:hidden">
        <button onClick={toggleNavbar} className="p-2">
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {isOpen && (
        <div className="flex flex-col md:hidden w-full mb-2 p-2">
          <div className="flex flex-col justify-between">
            <div className="my-2">
              <SearchBar
                searchQuery={searchQuery}
                onSearchChange={(e) => {
                  setSearchQuery(e.target.value); // Actualiza el estado de la búsqueda
                  setShowCards(true); // Si deseas mostrar los resultados filtrados inmediatamente
                }}
              />
            </div>
            <div className="inline-flex items-center flex-wrap my-2 w-full justify-between border-b-2">
              <div className="flex w-full mb-1">
                {session ? (
                  <div className="inline-flex w-full">
                    <div>
                      <p className="text-sm">Notificaciones</p>
                    </div>
                    <div className="mx-2">
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
        </div>
      )}

      {/* Barra de navegación desktop */}
      <div className="hidden md:flex flex-col grow">
        <div className="top-side flex flex-auto justify-between w-full my-2">
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={(e) => {
              setSearchQuery(e.target.value); // Actualiza el estado de la búsqueda
              setShowCards(true); // Si deseas mostrar los resultados filtrados inmediatamente
            }}
          />
          <div className="ml-2 flex border rounded-lg">
            <p className="ml-1">Notificaciones</p>
            <div className="ml-2">
              {session ? (
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
              ) : (
                <div className="flex items-center border ">
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
