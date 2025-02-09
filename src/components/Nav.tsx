"use client";
import { useState } from "react";
import { useSession, signOut, signIn } from "next-auth/react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/SearchBar";
import NotificationBell from "@/components/NotificationBell";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Links = () => (
  <div className="flex flex-wrap flex-col md:flex-row gap-2">
    {[
      "Playa",
      "Hoteles",
      "Actividades",
      "Fiesta",
      "Comida",
      "Arte y Cultura",
      "Más...",
    ].map((link) => (
      <Link
        key={link}
        href="#"
        className="my-1 md:my-0 font-medium px-4 py-2 border-r border-amber-400 hover:bg-amber-400 hover:rounded-t-lg last:border-r-0"
      >
        {link}
      </Link>
    ))}
  </div>
);

const Nav = ({ newsArticles }: { newsArticles: any[] }) => {
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [showCards, setShowCards] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const categories = [
    "All",
    ...new Set(newsArticles.map((article) => article.category)),
  ];

  const filteredArticles =
    categoryFilter === "All"
      ? newsArticles
      : newsArticles.filter((article) => article.category === categoryFilter);

  const handleHomeButtonClick = () => {
    setCategoryFilter("All");
    setShowCards(false);
  };

  const toggleNavbar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Barra de navegación con categorías */}
      <div className="flex flex-col items-center md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg z-10">
        <button onClick={toggleNavbar} className="p-2">
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {isOpen && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-10 p-2">
          <div className="flex flex-col justify-between">
            <div className="my-2">
              <SearchBar />
            </div>
            <div className="inline-flex items-center flex-wrap my-2 w-full justify-between border-b-2">
              <div className="flex w-full mb-1">
                {session ? (
                  <div className="inline-flex w-full">
                    <div>
                      <NotificationBell />
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
          <div className="bottom-side">
            <Links />
          </div>
        </div>
      )}

      {/* Barra de navegación desktop */}
      <div className="hidden md:flex flex-col grow">
        <div className="top-side flex flex-auto justify-between w-full my-2">
          <SearchBar />
          <div className="ml-2 flex border rounded-lg">
            <NotificationBell />
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
        <div className="bottom-side mx-2">
          <Links />
        </div>
      </div>
    </>
  );
};

export default Nav;
