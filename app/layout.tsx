import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientLayout from "./ClientLayout";
import "./globals.css";
import "./styles/main.css";
import "./styles/components.css";
import "./styles/animations.css";

export const metadata: Metadata = {
  title: "RO Latam Guide - Guía Completa de Ragnarok Online Latam",
  description: "Guías, builds, leveling y recursos para Ragnarok Online Latam 2025",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body>
        <ClientLayout>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ClientLayout>
      </body>
    </html>
  );
}
