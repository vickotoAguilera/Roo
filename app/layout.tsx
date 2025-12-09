import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./styles/main.css";
import "./styles/components.css";
import "./styles/animations.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "RO Latam Guide - Guía Completa de Ragnarok Online Latam",
  description: "Guía completa de Ragnarok Online Latam con builds, leveling, mobs, quests y más",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
