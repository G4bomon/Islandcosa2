"use client";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function ProfilePage() {
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
        <DropdownMenuItem onClick={()=> {signOut();}}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProfilePage;
