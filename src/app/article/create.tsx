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



export default function Form() {

    const { handler, error } = useHandleCreate();


    return(<form onSubmit={handler}>
        <Card className="w-[350px]">
            <CardHeader>
            <CardTitle>Noticias</CardTitle>
            <CardDescription>Crea tu articulo de forma facil</CardDescription>
            </CardHeader>
            <CardContent>
            <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                <Label htmlFor="title">Titulo</Label>
                <Input id="title" name="title" placeholder="Nombre del projecto" />
                </div>
                <div className="flex flex-col space-y-1.5">
                <Label htmlFor="content">contenido</Label>
                <Textarea id="content" name="content" placeholder="Escribe el contenido aqui" />
                </div>
                <div className="flex flex-col space-y-1.5">
                <Label htmlFor="category">Categoria</Label>
                <Select name="category">
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
                <Input id="image" name="image" placeholder="url de la imagen" />
                </div>
                <div className="flex flex-col space-y-1.5">
                <Label htmlFor="video">video</Label>
                <Input id="youtube" name="youtube" placeholder="url del video" />
                </div>
                <div className="flex flex-col space-y-1.5">
                <Label htmlFor="tiktok">tiktok</Label>
                <Input id="tiktok" name="tiktok" placeholder="Url del tiktok" />
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