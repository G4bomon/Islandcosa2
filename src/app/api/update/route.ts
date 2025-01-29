import { connectDB } from "@/libs/mongodb";
import News from "@/models/news";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
      await connectDB();
      const { title, content, category, image, youtube, tiktok, _id } = await request.json();
  
      if (content.length < 10)
        return NextResponse.json(JSON.parse(JSON.stringify(
          { message: "El contenido debe tener al menos 50 caracteres de largo" })),
          { status: 400 }
        );
  
      if (!category)
        return NextResponse.json(JSON.parse(JSON.stringify(
          { message: "La categoria no puede estar vacia" })),
          { status: 400 }
        );
  
      if (!image)
        return NextResponse.json(JSON.parse(JSON.stringify(
          { message: "El articulo debe tener al menos una imagen" })),
          { status: 400 }
        );
  
        const updatedNews = await News.findByIdAndUpdate(
            _id,
            {
              title,
              content,
              category,
              image,
              youtube,
              tiktok,
            },
            { new: true }
          );
  
      if (updatedNews.modifiedCount === 0)
        return NextResponse.json(JSON.parse(JSON.stringify(
          {
            message: "No changes were made",
          })),
          {
            status: 304,
          }
        );
  
      return NextResponse.json(JSON.parse(JSON.stringify(
        {
          message: "Article updated successfully",
        })),
        {
          status: 200,
        }
      );
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        return NextResponse.json(JSON.parse(JSON.stringify(
          {
            message: error.message,
          })),
          {
            status: 400,
          }
        );
      }
      return NextResponse.error();
    }
  }