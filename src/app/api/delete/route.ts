import { connectDB } from "@/libs/mongodb";
import News from "@/models/news";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectDB();
    const { _id } = await request.json();

    const deletedNews = await News.findByIdAndDelete(_id);

    if (!deletedNews) {
      return NextResponse.json(JSON.parse(JSON.stringify(
        {
          message: "Article not found",
        })),
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(JSON.parse(JSON.stringify(
      {
        message: "Article deleted successfully",
      })),
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.error();
  }
}