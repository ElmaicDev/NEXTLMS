"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-700 bg-slate-950/80 backdrop-blur">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-6">

        {/* LOGO */}
        <Link href="/" className="font-black text-xl text-white tracking-tight">
          NextLMS
        </Link>

        {/* NAV LINKS */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-slate-300">
          <Link href="#features" className="hover:text-cyan-400 transition-colors font-medium">
            Características
          </Link>
          <Link href="#pricing" className="hover:text-cyan-400 transition-colors font-medium">
            Precios
          </Link>
        </nav>

        {/* ACTIONS */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" className="text-slate-300 hover:text-cyan-400 hover:bg-slate-800" asChild>
            <Link href="/signin">Iniciar sesión</Link>
          </Button>

          <Button className="bg-cyan-500 text-slate-950 hover:bg-cyan-400 hover:text-white font-semibold" asChild>
            <Link href="/signup">Empezar gratis</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}