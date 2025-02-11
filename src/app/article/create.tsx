
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
import { useHandleCreate } from "@/app/article/handlecreate"
import BackButton from '@/components/BackButton';
import { useRouter } from 'next/navigation';


export default function Form() {

    const { handler, error } = useHandleCreate();
    const router = useRouter();

    return (<form onSubmit={handler}>
        <div className="flex justify-center py-10 px-4 bg-gray-100 min-h-screen">
            <div className="w-full max-w-3xl">

            <BackButton />
            <Card className="shadow-lg bg-white rounded-xl">
                <CardHeader className="bg-amber-400 text-black p-5 rounded-t-xl">
                    <CardTitle className="text-xl font-bold text-center">Crear Noticia</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div>
                            <Label htmlFor="title">Titulo</Label>
                            <Input id="title" name="title" placeholder="Nombre del articulo" className="border-gray-300" />
                        </div>
                        <div>
                            <Label htmlFor="category">Categoria</Label>
                            <Select name="category">
                                <SelectTrigger id="category" className="border-gray-300">
                                    <SelectValue placeholder="Seleccionar" />
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

                        <div>
                            <Label htmlFor="content">Contenido</Label>
                            <Textarea id="content" name="content" placeholder="Escribe el contenido aqui" className="border-gray-300" />
                        </div>
                        <div>
                            <Label htmlFor="image">Imagen de portada</Label>
                            <Input id="image" name="image" placeholder="url de la imagen" />
                        </div>


                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <Label htmlFor="youtube">Video (YouTube)</Label>
                                <Input id="youtube" name="youtube" placeholder="URL del video" className="border-gray-300" />
                            </div>
                            <div>
                                <Label htmlFor="tiktok">TikTok</Label>
                                <Input id="tiktok" name="tiktok" placeholder="URL del TikTok" className="border-gray-300" />
                            </div>
                        </div>


                    </div>

                    {error && (
                        <div className="flex justify-center mt-4 bg-red-600 text-white rounded-md"> {error} </div>
                    )}
                </CardContent>
                <CardFooter className="p-6 flex flex-col md:flex-row justify-between gap-4">
                    <Button variant="outline" type="button" onClick={() => router.back()} className="text-gray-700 border-gray-400 w-full md:w-auto py-3 text-lg">
                        Cancelar
                    </Button>
                    <Button type="submit" className="bg-amber-400 hover:bg-amber-600 text-black w-full md:w-auto py-3 text-lg">
                        Crear
                    </Button>
                </CardFooter>
            </Card>
            </div>
        </div>
    </form>
    );
}