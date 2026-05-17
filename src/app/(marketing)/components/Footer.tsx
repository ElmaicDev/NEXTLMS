import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-slate-700 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">

        {/* BRAND */}
        <div>
          <h3 className="font-black text-lg text-white">NextLMS</h3>
          <p className="text-slate-400 mt-3 text-sm leading-relaxed">
            La plataforma moderna para crear y gestionar cursos online con herramientas profesionales.
          </p>
        </div>

        {/* PRODUCTO */}
        <div className="flex flex-col gap-4">
          <span className="font-semibold text-white text-sm">Producto</span>
          <Link href="#features" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">
            Características
          </Link>
          <Link href="#pricing" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">
            Precios
          </Link>
        </div>

        {/* EMPRESA */}
        <div className="flex flex-col gap-4">
          <span className="font-semibold text-white text-sm">Empresa</span>
          <Link href="/" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">
            Sobre nosotros
          </Link>
          <Link href="/" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">
            Blog
          </Link>
        </div>

        {/* LEGAL */}
        <div className="flex flex-col gap-4">
          <span className="font-semibold text-white text-sm">Legal</span>
          <Link href="/terms" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">
            Términos
          </Link>
          <Link href="/privacy" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">
            Privacidad
          </Link>
        </div>

      </div>

      <div className="border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} NextLMS. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}