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
            <div className="flex flex-wrap flex-col md:flex-row">
                <Link href="#" className="my-1 md:my-0 font-medium md:px-4 md:py-2 md:border-r border-amber-400 md:hover:bg-amber-400 md:hover:rounded-t-lg last:border-r-0">Playa</Link>
                <Link href="#" className="my-1 md:my-0 font-medium md:px-4 md:py-2 md:border-r border-amber-400 md:hover:bg-amber-400 md:hover:rounded-t-lg last:border-r-0">Hoteles</Link>
                <Link href="#" className="my-1 md:my-0 font-medium md:px-4 md:py-2 md:border-r border-amber-400 md:hover:bg-amber-400 md:hover:rounded-t-lg last:border-r-0">Actividades</Link>
                <Link href="#" className="my-1 md:my-0 font-medium md:px-4 md:py-2 md:border-r border-amber-400 md:hover:bg-amber-400 md:hover:rounded-t-lg last:border-r-0">Fiesta</Link>
                <Link href="#" className="my-1 md:my-0 font-medium md:px-4 md:py-2 md:border-r border-amber-400 md:hover:bg-amber-400 md:hover:rounded-t-lg last:border-r-0">Comida</Link>
                <Link href="#" className="my-1 md:my-0 font-medium md:px-4 md:py-2 md:border-r border-amber-400 md:hover:bg-amber-400 md:hover:rounded-t-lg last:border-r-0">Arte y Cultura</Link>
                <Link href="#" className="my-1 md:my-0 font-medium md:px-4 md:py-2 md:border-r border-amber-400 md:hover:bg-amber-400 md:hover:rounded-t-lg last:border-r-0">Más...</Link>
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

            {/*vista mobile*/}
            <div className="flex flex-col items-center md:hidden">
                <button onClick={toggleNavbar} className="p-2">
                    {isOpen ? <X size={32} /> : <Menu size={32} />}
                </button>
            </div>
            {isOpen && (
                <div className="flex flex-col md:hidden w-full mb-2 p-2">
                    <div className="top-side flex flex-col justify-between">
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

                                            <ProfilePage />
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
                            <div className="w-full">
                                <Links />
                            </div>
                        </nav>
                    </div>
                </div>
            )}

            {/*vista desktop*/}
            {/*este div tiene que ir oculto en mobile*/}
            <div className="hidden md:flex flex-col grow">
                <div className="top-side flex flex-auto justify-between w-full my-2">
                    <SearchBar />
                    <div className="ml-2 flex border rounded-lg">
                        <NotificationBell />
                        <p className="ml-1">Notificaciones</p>
                        <div className="ml-2">
                            {session ? (
                                // Si el usuario está logueado, muestra su perfil
                                <ProfilePage />
                            ) : (
                                // Si no está logueado, muestra el botón de login y register
                                <div className="flex items-center border ">
                                    <button onClick={() => signIn()} className="px-4 py-2 border rounded-lg">
                                        Iniciar Sesión
                                    </button>
                                    <Link
                                        href="/register"
                                        className="px-4 py-2 border rounded-lg">
                                        Registrarse
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="bottom-side mx-2">
                    <nav className="">
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