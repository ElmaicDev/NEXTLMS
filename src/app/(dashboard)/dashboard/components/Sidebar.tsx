import Link from "next/link"
import { LayoutDashboard, BookOpen, Users, Settings } from "lucide-react"

export function Sidebar() {
  return (
    <aside className="w-64 border-r border-slate-700 bg-slate-900 hidden md:flex flex-col">

      {/* LOGO */}
      <div className="h-16 flex items-center px-6 border-b border-slate-700">
        <div>
          <h2 className="font-black text-lg text-white">NextLMS</h2>
          <p className="text-xs text-slate-400">Admin Panel</p>
        </div>
      </div>

      {/* NAV */}
      <nav className="flex-1 px-3 py-4 space-y-1">

        <Link
          href="/dashboard"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-cyan-400 transition-colors"
        >
          <LayoutDashboard size={20} />
          <span className="font-medium">Overview</span>
        </Link>

        <Link
          href="/dashboard/courses"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-cyan-400 transition-colors"
        >
          <BookOpen size={20} />
          <span className="font-medium">Cursos</span>
        </Link>

        <Link
          href="/dashboard/students"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-cyan-400 transition-colors"
        >
          <Users size={20} />
          <span className="font-medium">Estudiantes</span>
        </Link>

        <Link
          href="/dashboard/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-cyan-400 transition-colors"
        >
          <Settings size={20} />
          <span className="font-medium">Configuración</span>
        </Link>

      </nav>

      {/* FOOTER */}
      <div className="px-4 py-4 border-t border-slate-700 text-xs text-slate-500">
        <p>© 2026 NextLMS</p>
        <p>Plataforma de educación digital</p>
      </div>

    </aside>
  )
}