import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import User from "@/models/user";
import { connectDB } from "@/libs/mongodb";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const user = await User.findOne({ email: session.user.email });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json({ favorites: user.favorites || [] });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { articleId } = await req.json();
  await connectDB();
  const user = await User.findOne({ email: session.user.email });

  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  if (user.favorites.includes(articleId)) {
    user.favorites = user.favorites.filter((id: string) => id !== articleId);
  } else {
    user.favorites.push(articleId);
  }

  await user.save();
  return NextResponse.json({ favorites: user.favorites });
}
