"use client";
import { FormEvent, useState } from "react";
import { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
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
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Log in</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
      <CardContent>
        
          <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input type="email" name="email" placeholder="input email" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input type="password" name="password" placeholder="input password" />
            </div>
          </div>
          {error && (
          <div className="flex justify-center mt-4 bg-red-600 text-white rounded-md"> {error} </div>
          )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href={"/register"} className="hover:text-blue-500"> 
          Create an account 
        </Link>
        <Button>Log in</Button>
      </CardFooter>
      </form>
    </Card>
  );
}

export default Signin;
