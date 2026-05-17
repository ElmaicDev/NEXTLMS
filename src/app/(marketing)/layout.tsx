import type { Metadata } from "next";
import { Navbar } from "./components/Navbar"
import { Footer } from "./components/Footer"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "NextLMS - Plataforma de Cursos Online",
  description: "Crea, gestiona y escala tus cursos online con NextLMS, la plataforma moderna para educadores y estudiantes.",
};

// (marketing)/layout.tsx
export default function MarketingLayout({ children }: { children: ReactNode }) {
    return (
        <div>
            <Navbar />
            {children}
            <Footer />
        </div>
    )
}