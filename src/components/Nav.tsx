"use client"
import { useSession, signOut, signIn } from "next-auth/react";
import Link from "next/link"
import { Menu, X, } from "lucide-react";
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
            <div className="flex flex-wrap flex-col md:flex-row md:space-x-4">
                <Link href="#" className="my-1 text-sm">Playa</Link>
                <Link href="#" className="my-1 text-sm">Hoteles</Link>
                <Link href="#" className="my-1 text-sm">Actividades</Link>
                <Link href="#" className="my-1 text-sm">Fiesta</Link>
                <Link href="#" className="my-1 text-sm">Comida</Link>
                <Link href="#" className="my-1 text-sm">Arte y Cultura</Link>
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
            {/*este div tiene que estar oculto en mobile y abrirse todo cuando sea clickeado en toggle*/}
            {/* 
                boton toggle
                <button onClick={toggleNavbar}>
                    {isOpen ? <X /> : <Menu />}
                </button>
                este es el toggle en vista mobile clickeas el boton del menu
                cuando es clickeado, genera esto:
                    {isOpen && (
                        <div className="flex flex-col basis-full md:hidden">
                            <Links />
                        </div>
                    )}*/}

            {/* */}
            <div className="flex flex-col items-center justify-center md:hidden">
                <button onClick={toggleNavbar} className="p-2">
                    {isOpen ? <X size={32} /> : <Menu size={32} />}
                </button>
                {isOpen && (
                    <div className="flex flex-col md:hidden">
                        <div className="top-side flex flex-col justify-between">
                            <SearchBar />
                            <div className="ml-2 inline-flex items-center border max-w-max">
                                <NotificationBell />
                                <p className="ml-1 text-sm">Notificaciones</p>
                                <div className="ml-2">
                                    {session ? (
                                        <ProfilePage />
                                    ) : (
                                        <div className="flex items-center space-x-2">
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
                                <div className="w-full">
                                    <Links/>
                                </div>
                            </nav>
                        </div>
                    </div>
                )}
            </div>

            {/*este div tiene que ir oculto en mobile y ser cambiado por el div del boton menu,
            al ser clickeado pues muestra los 2 divs internos que tiene */}
            <div className="hidden md:flex flex-col">
                <div className="top-side flex justify-between">
                    <SearchBar />
                    <div className="ml-2 flex border">
                        <NotificationBell />
                        <p className="ml-1">Notificaciones</p>
                    </div>
                    <div className="ml-2">
                        {session ? (
                            // Si el usuario está logueado, muestra su perfil
                            <ProfilePage />
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
                        <div className="w-full flex flex-wrap">
                            <Links />
                        </div>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default Nav