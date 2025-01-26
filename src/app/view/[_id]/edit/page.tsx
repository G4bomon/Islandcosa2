"use client";

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useParams, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from 'next/navigation';




function Fullarticle() {
    const [error, setError] = useState<string | null>(null); 
    const params = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();

    const _id = params._id;
    const title = searchParams.get("title") || "";
    const content = searchParams.get("content") || "";
    const category = searchParams.get("category") || "";
    const image = searchParams.get("image") || "";
    const youtube = searchParams.get("youtube") || "";
    const tiktok = searchParams.get("tiktok") || "";
    const handlerUpdate = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      const formdata = new FormData(e.currentTarget);
  
      try {
        const Newsres = await axios.post('/api/update', {
          _id: _id,
          title: formdata.get('title'),
          content: formdata.get('content'),
          category: formdata.get('category'),
          image: formdata.get('image'),
          youtube: formdata.get('youtube'),
          tiktok: formdata.get('tiktok')
        });
        console.log(Newsres);
        router.push('/');
      } catch (error) {
        console.log(error);
        if (error instanceof AxiosError) {
          const errorMessage = error.response?.data.message;
          setError(errorMessage);
        }
      }
    };

    
    return (
      <form onSubmit={handlerUpdate}>
        <Card className="w-[350px]">
            <CardHeader>
            <CardTitle>Noticias</CardTitle>
            <CardDescription>Crea tu articulo de forma facil</CardDescription>
            </CardHeader>
            <CardContent>
            <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                <Label htmlFor="title">Titulo</Label>
                <Input id="title" name="title" placeholder="Nombre del projecto" defaultValue={title} />
                </div>
                <div className="flex flex-col space-y-1.5">
                <Label htmlFor="content">contenido</Label>
                <Textarea id="content" name="content" placeholder="Escribe el contenido aqui" defaultValue={content}/>
                </div>
                <div className="flex flex-col space-y-1.5">
                <Label htmlFor="category">Categoria</Label>
                <Select name="category">
                    <SelectTrigger id="category">
                    <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper" defaultValue={category}>
                    <SelectItem value="Playa">Playa</SelectItem>
                    <SelectItem value="Hotel">Hotel</SelectItem>
                    <SelectItem value="Actividad">Actividades</SelectItem>
                    <SelectItem value="Fiesta">Fiesta</SelectItem>
                    <SelectItem value="Comida">Comida</SelectItem>
                    <SelectItem value="Arte">Arte y cultura</SelectItem>
                    </SelectContent>
                </Select>
                </div>
                <div className="flex flex-col space-y-1.5">
                <Label htmlFor="image">Imagen de portada</Label>
                <Input id="image" name="image" placeholder="url de la imagen" defaultValue={image}/>
                </div>
                <div className="flex flex-col space-y-1.5">
                <Label htmlFor="video">video</Label>
                <Input id="youtube" name="youtube" placeholder="url del video" defaultValue={youtube}/>
                </div>
                <div className="flex flex-col space-y-1.5">
                <Label htmlFor="tiktok">tiktok</Label>
                <Input id="tiktok" name="tiktok" placeholder="Url del tiktok" defaultValue={tiktok}/>
                </div>
            </div>
            {error && (
                <div className="flex justify-center mt-4 bg-red-600 text-white rounded-md"> {error} </div>
            )}
            </CardContent>
            <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button>Publicar</Button>
            </CardFooter>
        </Card>
        </form>
  );
}

export default Fullarticle;