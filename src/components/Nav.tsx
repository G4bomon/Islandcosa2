"use client";
import { useState, useEffect } from "react";
import { useSession, signOut, signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, Bell, Search } from "lucide-react";
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
import { Input } from "./ui/input";
const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const router = useRouter();
  const { data: session } = useSession();


  const handlesearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchInput = e.currentTarget.search.value.trim();
    if (searchInput) {
      router.push(`/busqueda/${encodeURIComponent(searchInput)}`);
    }
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
            <form onSubmit={handlesearch} className="flex w-full max-w-sm items-center space-x-2">
              <Input 
                type="search" 
                name="search"
                placeholder="Busca opciones" 
                className="rounded-3xl"
              />
              <Button type="submit" size="sm" className="rounded-full">
                <Search />
              </Button>
            </form>
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
                                onClick={() =>
                                  router.push(`/view/${notif._id}/full`)
                                }
                              >
                                {notif.title}
                              </DropdownMenuItem>
                            ))
                          ) : (
                            <DropdownMenuItem>
                              No hay notificaciones
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="mx-2 flex">
                      {" "}
                      {/*vista registro e inicio sesion */}
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
                        <ArticleButton />
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
        </div>
      )}

      {/* vista desktop, también está el input campana inicio y registro*/}
      <div className="hidden md:flex flex-col grow">
        <div className="top-side flex flex-auto justify-between w-full my-2">
        <form onSubmit={handlesearch} className="flex w-full max-w-sm items-center space-x-2">
          <Input 
            type="search" 
            name="search"
            placeholder="Busca opciones" 
            className="rounded-3xl"
          />
          <Button type="submit" size="sm" className="rounded-full">
            <Search />
          </Button>
        </form>
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
              <ArticleButton />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
