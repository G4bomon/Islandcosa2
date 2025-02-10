"use client";
import { FormEvent, useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import GameCaptcha from "@/components/GameCaptcha"; // Ajusta la ruta

function Signin() {
  const [loginAttempt, setLoginAttempt] = useState(0);
  const [error, setError] = useState("");
  const [captchaSolved, setCaptchaSolved] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLoginAttempt(1); // Activa el captcha desde el inicio
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!captchaSolved) {
      setError("Por favor, completa el CAPTCHA.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      setError("Correo y/o contraseña son requeridos");
      return;
    }

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError(res.error as string);
    }

    if (res?.ok) {
      router.push("/Pruebas");
      setCaptchaSolved(false);
      setLoginAttempt(1);
    }
  }

  const handleCaptchaSolved = () => {
    setCaptchaSolved(true);
    setError("");
  };

  const handleCaptchaFailed = () => {
    setCaptchaSolved(false);
    setError("Captcha incorrecto. Inténtalo de nuevo.");
  };

  return (
    <div className="mt-10 flex flex-col w-11/12 max-w-lg md:w-11/12 mx-auto shadow-lg rounded-lg">
      <div className="bg-logo-background bg-cover bg-clip-content grow-0 mb-2 rounded-t-lg">
        <Image
          src="/img/logo-round.png"
          alt="PreDespacho Logo"
          width={80}
          height={80}
          className="mx-auto my-4"
        />
      </div>
      <div className="p-8">
        <div className="mb-6">
          <h1 className="text-3xl">Iniciar Sesión</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-1.5 mb-3">
            <Label htmlFor="email" className="block font-semibold text-base mb-1">
              Correo electronico
            </Label>
            <Input
              type="email"
              name="email"
              className="hover:shadow-md"
              placeholder="Ingresa tu correo"
              required
            />
          </div>
          <div className="flex flex-col space-y-1.5 mb-3">
            <Label htmlFor="password" className="block font-semibold text-base mb-1">
              Contraseña
            </Label>
            <Input
              type="password"
              name="password"
              className="hover:shadow-md"
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>
          {error && (
            <div className="flex justify-center mt-4 bg-red-600 text-white rounded-md mb-4 p-2">
              {error}
            </div>
          )}
          <div className="mb-4">
            <GameCaptcha onSolved={handleCaptchaSolved} onFailed={handleCaptchaFailed} />
          </div>
          <Button type="submit" className="flex w-full hover:bg-[#FFB200]">
            Iniciar Sesión
          </Button>
        </form>
        <div className="flex flex-col items-center my-4">
          <p>
            ¿No tienes cuenta? <Link href="/register" className="hover:text-blue-500">Registrate</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signin;