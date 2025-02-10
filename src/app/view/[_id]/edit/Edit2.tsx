'use client';

import { useNewsStore } from '@/app/store';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import axios, { AxiosError } from 'axios';

function Edit2() {
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { id, title, content, category, image, youtube, tiktok } = useNewsStore();

    const handlerUpdate = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        const formdata = new FormData(e.currentTarget);
    
        try {
          const Newsres = await axios.post('/api/update', {
            _id: id,
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
                    <CardTitle>Editar Noticia</CardTitle>
                    <CardDescription>Modifica tu artículo</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="title">Titulo</Label>
                            <Input 
                                id="title" 
                                name="title" 
                                placeholder="Nombre del proyecto" 
                                defaultValue={title}
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="content">Contenido</Label>
                            <Textarea 
                                id="content" 
                                name="content" 
                                placeholder="Escribe el contenido aqui" 
                                defaultValue={content}
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="category">Categoria</Label>
                            <Select name="category" defaultValue={category}>
                                <SelectTrigger id="category">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent position="popper">
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
                            <Input 
                                id="image" 
                                name="image" 
                                placeholder="url de la imagen" 
                                defaultValue={image}
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="youtube">Video</Label>
                            <Input 
                                id="youtube" 
                                name="youtube" 
                                placeholder="url del video" 
                                defaultValue={youtube}
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="tiktok">TikTok</Label>
                            <Input 
                                id="tiktok" 
                                name="tiktok" 
                                placeholder="Url del tiktok" 
                                defaultValue={tiktok}
                            />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" type="button" onClick={() => router.back()}>
                        Cancel
                    </Button>
                    <Button type="submit">Actualizar</Button>
                </CardFooter>
            </Card>
        </form>
    );
}

export default Edit2;