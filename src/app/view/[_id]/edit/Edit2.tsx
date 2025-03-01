'use client';

import { useNewsStore } from '@/app/store';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
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

        <div className="flex justify-center py-10 bg-gray-100 min-h-screen">
            <form onSubmit={handlerUpdate} className="w-full max-w-3xl">
                <Card className="shadow-lg bg-white rounded-xl">
                    <CardHeader className='bg-amber-400 text-white p-5 rounded-t-xl'>
                        <CardTitle className='text-xl font-bold text-center'>Editar Noticia</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                        {error && <p className="text-red-500 text-center">{error}</p>}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <Label htmlFor="title">Título</Label>
                                <Input id="title"
                                    name="title"
                                    placeholder="Nombre del proyecto"
                                    defaultValue={title}
                                    className="border-gray-300" />
                            </div>

                            <div>
                                <Label htmlFor="category">Categoría</Label>
                                <Select name="category" defaultValue={category}>
                                    <SelectTrigger className="border-gray-300">
                                        <SelectValue placeholder="Seleccionar" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Playa">Playa</SelectItem>
                                        <SelectItem value="Hotel">Hotel</SelectItem>
                                        <SelectItem value="Actividad">Actividades</SelectItem>
                                        <SelectItem value="Fiesta">Fiesta</SelectItem>
                                        <SelectItem value="Comida">Comida</SelectItem>
                                        <SelectItem value="Arte">Arte y cultura</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label htmlFor="content">Contenido</Label>
                                <Textarea
                                    id="content"
                                    name="content"
                                    placeholder="Escribe el contenido aquí"
                                    defaultValue={content}
                                    className="border-gray-300" />
                            </div>
                            
                            <div>
                                <Label htmlFor="image">Imagen de portada</Label>
                                <Input
                                    id="image"
                                    name="image"
                                    placeholder="url de la imagen"
                                    defaultValue={image}
                                    className="border-gray-300"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <Label htmlFor="youtube">Video (YouTube)</Label>
                                    <Input id="youtube"
                                    name="youtube"
                                    placeholder="URL del video"
                                    defaultValue={youtube}
                                    className="border-gray-300" />
                                </div>
                                <div>
                                    <Label htmlFor="tiktok">TikTok</Label>
                                    <Input id="tiktok"
                                    name="tiktok"
                                    placeholder="URL del TikTok"
                                    defaultValue={tiktok}
                                    className="border-gray-300" />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="p-6 flex justify-between">
                        <Button variant="outline" type="button" onClick={() => router.back()}
                            className="text-gray-700 border-gray-400 hover:bg-red-500">
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-amber-400 hover:bg-amber-600 text-white">Actualizar</Button>
                    </CardFooter>
                </Card>
            </form>
        </div>
    );
}

export default Edit2;