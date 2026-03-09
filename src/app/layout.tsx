import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Makine Operasyon Platformu", description: "Frontend prototip" };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="tr"><body>{children}</body></html>;}
