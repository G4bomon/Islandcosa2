import { connectDB } from "@/libs/mongodb";
import News from "@/models/news";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    context: { params: Promise<{ id: string }> } // Asegura que params sea una Promise
) {
    try {
        await connectDB();

        // Esperar la resolución de la promesa
        const { id } = await context.params;  

        const article = await News.findOne({ _id: id });

        if (!article) {
            return NextResponse.json(
                { message: "Artículo no encontrado" },
                { status: 404 }
            );
        }

        return NextResponse.json(article);
    } catch (error: unknown) {
        console.error("Error en GET /articles/:id:", error);
        return NextResponse.json(
            { 
                message: "Error al cargar el artículo", 
                error: error instanceof Error ? error.message : "Error desconocido" 
            },
            { status: 500 }
        );
    }
}
