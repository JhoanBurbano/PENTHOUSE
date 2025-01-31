import type { Metadata, Viewport } from "next";
import { Inter, Bodoni_Moda } from "next/font/google";
import "../styles/global.css";
import Navbar from "@/components/organisms/NavbarBar";
import ReduxProvider from "@/providers/ReduxProvider";
import Footer from "@/components/molecules/Footer";

const InterFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100","200", "300","400", "700"],
});

const BodoniFont = Bodoni_Moda({
  variable: "--font-bodoni-moda",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "%s | Penthouse",
  description: "Find your dream home",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${InterFont.variable} ${BodoniFont.variable} antialiased transition-all duration-300`}
      >
        <ReduxProvider>
          <Navbar />
          {children}
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
