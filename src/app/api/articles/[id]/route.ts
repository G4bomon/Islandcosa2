import { connectDB } from "@/libs/mongodb";
import News from "@/models/news";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        await connectDB();
        
        const article = await News.findOne({ _id: params.id });
        
        if (!article) {
            return NextResponse.json(
                { message: "Artículo no encontrado" },
                { status: 404 }
            );
        }

        return NextResponse.json(article);
    } catch (error) {
        return NextResponse.json(
            { message: "Error al cargar el artículo" },
            { status: 500 }
        );
    }
}
