import "./globals.css";
import { Inter } from "next/font/google";
import NavMenu from "@/components/navigation/NavMenu";
import AuthProvider from "@/components/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Magic Music Recs",
  description: "Discover new artists and dive into your spotify stats",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={`${inter.className} dark `}>
          <NavMenu />
          <main className="flex justify-center items-center">{children}</main>
        </body>
      </html>
    </AuthProvider>
  );
}
