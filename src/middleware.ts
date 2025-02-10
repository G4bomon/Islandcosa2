export { default } from "next-auth/middleware";

export const config = { matcher: ["/article","/dashboard/:path*", "/view/:path*/edit"] };
