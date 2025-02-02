"use client"
import { useSession, signOut , signIn} from "next-auth/react";
import Link from "next/link"
import { Menu, X,} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button"
import SearchBar from "@/components/SearchBar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import NotificationBell from "@/components/NotificationBell";
const Links = () => {
    return (

        <>
            <div className="flex space-x-4 flex-wrap">
                <Link href="#">Eventos</Link>
                <Link href="#">Historia y Cultura</Link>
                <Link href="#">Entretenimiento</Link>
                <Link href="#">Hoteles</Link>
                <Link href="#">Promociones</Link>
                <Link href="#">Compras</Link>
            </div>
        </>
    )
}
const ProfilePage = () => {
    const { data: session } = useSession();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    {session && session.user ? (
                        <p>{session.user.fullname}</p>
                    ) : (
                        <p>Profile</p> // or any other fallback message
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>
                    {session && session.user ? (
                        <p>{session.user.email}</p>
                    ) : (
                        <p>email</p> // or any other fallback message
                    )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        Seccion 1
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Seccion 2
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Seccion 3
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => { signOut(); }}>
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

const Nav = () => {
    const { data: session } = useSession(); // Obtiene la sesión del usuario
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen)
    }
    return (
        <>
            <div className="flex flex-col">
                {/*hay que ocultar el top-side en mobile y pasarlo al div que se muestra cuando se hace toggle */}
                <div className="top-side flex justify-between">
                    <SearchBar/>
                    <div className="ml-2 flex border">
                        <NotificationBell />
                        <p className="ml-1">Notificaciones</p>
                    </div>
                    <div className="ml-2">
                    {session ? (
                        // Si el usuario está logueado, muestra su perfil
                        <ProfilePage/>
                    ) : (
                        // Si no está logueado, muestra el botón de login y register
                        <div className="flex items-center">
                            <button onClick={() => signIn()} className="px-4 py-2 border rounded">
                                Iniciar Sesión
                            </button>
                            <Link 
                                href="/register" 
                                className="px-4 py-2 border rounded">
                                Registrarse
                            </Link>
                        </div>
                    )}
                    </div>
                </div>
                <div className="bottom-side">
                    <nav className="w-auto flex justify-end">
                        <div className="hidden w-full md:flex flex-wrap">
                            <Links />
                        </div>
                        <div className="md:hidden">
                            <button onClick={toggleNavbar}>
                                {isOpen ? <X /> : <Menu />}
                            </button>
                        </div>
                    </nav>
                    {/*este es el toggle en vista mobile clickeas el boton del menu*/}
                    {isOpen && (
                        <div className="flex flex-col basis-full md:hidden">
                            <Links />
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Nav