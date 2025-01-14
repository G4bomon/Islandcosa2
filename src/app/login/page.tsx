"use client";
import { FormEvent, useState } from "react";
import { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
import Image from "next/image";

//NO SE USARA
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

function Signin() {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    if (res?.error) setError(res.error as string);

    if (res?.ok) return router.push("/dashboard/profile");
  };

  return (

    <>
      <div className="mt-10 flex flex-col w-11/12 max-w-lg md:w-11/12 mx-auto shadow-lg rounded-lg">
        <div className="logo-section bg-logo-background bg-cover bg-clip-content grow-0  mb-2 rounded-t-lg">
          <div>
            <Image
              src="/img/logo-round.png"
              alt="PreDespacho Logo"
              width={80}
              height={80}
              className="mx-auto my-4"
            />
          </div>
        </div>
        <div className="login-section p-8">
          <div className="login-title mb-6">
            <h1 className="text-3xl">Iniciar Sesión</h1>
          </div>
          <form onSubmit={handleSubmit}>

            <div className="login-form">
              <div className="flex flex-col space-y-1.5 mb-3">
                <Label htmlFor="email" className="block font-semibold text-base mb-1">Correo electronico</Label>
                <Input type="email" name="email" className = "hover:shadow-md" placeholder="Ingresa tu correo" />
              </div>
              <div className="flex flex-col space-y-1.5 mb-3">
                <Label htmlFor="password" className="block font-semibold text-base mb-1">Contraseña</Label>
                <Input type="password" name="password" className="hover:shadow-md" placeholder="Ingresa tu contraseña" />
              </div>
              {error && (
                <div className="flex justify-center mt-4 bg-red-600 text-white rounded-md mb-4"> {error} </div>
              )}
              <Button className="flex mt-1 w-full hover:bg-[#FFB200]">Log in</Button>
            </div>
          </form>
          <div className="flex flex-col items-center my-4">
            <div>
              <p>
              ¿No tienes cuenta? {" "}
              <Link href={"/register"} className="hover:text-blue-500">
                Registrate
              </Link>

              </p>
            </div>
          </div>
        </div>

      </div>
      </>
  );
}

export default Signin;