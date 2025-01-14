"use client";
import { FormEvent, useState } from "react";
import axios, { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image";

function Signup() {
  const [error, setError] = useState();
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const signupResponse = await axios.post("/api/auth/signup", {
        email: formData.get("email"),
        password: formData.get("password"),
        fullname: formData.get("fullname"),
      });
      console.log(signupResponse);
      const res = await signIn("credentials", {
        email: signupResponse.data.email,
        password: formData.get("password"),
        redirect: false,
      });

      if (res?.ok) return router.push("/dashboard/profile");
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data.message;
        setError(errorMessage);
      }
    }
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
            <h1 className="text-3xl mb-3">Registro</h1>
            <p className="text-sm text-slate-500">Por favor llena los datos</p>
          </div>
          <form onSubmit={handleSubmit}>

            <div>
              <div className="flex flex-col space-y-1.5 mb-3">
                <Label htmlFor="name" className="block font-semibold text-base mb-1">Nombre</Label>
                <Input type="text" name="fullname" className="hover:shadow-md" placeholder="Ingresa tu nombre" />
              </div>
              <div className="flex flex-col space-y-1.5 mb-3">
                <Label htmlFor="email" className="block font-semibold text-base mb-1">Correo electronico</Label>
                <Input type="email" name="email" className="hover:shadow-md" placeholder="Ingresa tu correo" />
              </div>
              <div className="flex flex-col space-y-1.5 mb-3">
                <Label htmlFor="password" className="block font-semibold text-base mb-1">Contraseña</Label>
                <Input type="password" name="password" className="hover:shadow-md" placeholder="Ingresa tu contraseña" />
              </div>
              {error && (
                <div className="flex justify-center mt-4 bg-red-600 text-white rounded-md mb-4"> {error} </div>
              )}
              <Button className="flex mt-1 w-full hover:bg-amber-400">Registrate</Button>
            </div>
          </form>
          <div className="flex flex-col items-center my-4">
            <div>
              <p className="text-sm text-slate-500">
                ¿Ya tienes cuenta? {" "}
                <Link href={"/login"} className="hover:text-blue-500">
                  inicia sesión.
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
