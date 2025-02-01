"use client"
import { useSession, signOut } from "next-auth/react";
import Link from "next/link"
import { Menu, X, Search } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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

    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen)
    }
    return (
        <>
            <div className="flex flex-col">

                <div className="top-side flex justify-between">

                    <div className="flex w-full max-w-sm items-center space-x-2">
                        <Input type="search" placeholder="Busca opciones" />
                        <Button type="submit">
                            <Search />
                        </Button>
                    </div>
                    <div className="ml-2 flex border">
                        <NotificationBell />
                        <p className="ml-1">Notificaciones</p>
                    </div>
                    <div className="ml-2">
                        {ProfilePage()}
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