import NextAuth from "next-auth";
import { authOptions } from "@/libs/authOptions"; // ✅ Import from separate file

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
