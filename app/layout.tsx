import type { Metadata } from "next";
import {  Schibsted_Grotesk,Martian_Mono, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import LightRays from "@/components/LightRays";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const  SchibstedGrotesk =  Schibsted_Grotesk({
  variable: "--font-schibsted-grotesk",
  subsets: ["latin"],
});

const MartianMono = Martian_Mono({
  variable: "--font-martion-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevEvent",
  description: "The Hub for Every Dev Event you Must't Miss",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("min-h-screen", "h-full", "antialiased", SchibstedGrotesk.variable, MartianMono.variable, "font-sans", geist.variable)}
    >
      <body className="relative min-h-full flex flex-col">
       <div className="pointer-events-none fixed inset-0 z-[-1] min-h-screen">
         <LightRays
             raysColor="#5dfeca"
             raysSpeed={0.5}
             lightSpread={0.9}
             rayLength={1.4}
             followMouse={true}
             mouseInfluence={0.02}
             noiseAmount={0.0}
             distortion={0.01}

         />
       </div>
        <main className="relative z-10">
          {children}
        </main>
     </body>
    </html>
  );
}
