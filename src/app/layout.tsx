import Providers from "./Providers";
import "./globals.css";

export const metadata = {
  title: "Islandcosa",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
