import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <section className="relative overflow-hidden bg-slate-950/80 px-6 py-24 sm:px-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.25),transparent_24%),radial-gradient(circle_at_20%_30%,rgba(168,85,247,0.18),transparent_25%)] blur-3xl" />
        <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-10 text-center">
          <div className="w-full rounded-[2.5rem] border border-slate-700/70 bg-slate-900/70 p-10 shadow-[0_40px_120px_-40px_rgba(15,23,42,0.9)] backdrop-blur-xl sm:px-14">
            <p className="mb-4 inline-flex rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-300 ring-1 ring-cyan-300/20">
              Plataforma de formación moderna
            </p>
            <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl">
              Aprende, crea y escala cursos con estilo profesional.
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
              NextLMS es la solución todo-en-uno para docentes, academias y equipos de capacitación que necesitan una experiencia elegante, rápida y fácil de usar.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="min-w-45 bg-cyan-500 text-slate-950 hover:bg-cyan-400" asChild>
                <Link href="/signup">Empezar gratis</Link>
              </Button>
              <Button variant="outline" size="lg" className="min-w-45 border-slate-500 text-slate-100 hover:border-slate-400 hover:text-white" asChild>
                <Link href="/signin">Iniciar sesión</Link>
              </Button>
            </div>
          </div>

          <div className="grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-slate-700/70 bg-slate-900/70 p-6 shadow-xl shadow-cyan-500/10 backdrop-blur-xl">
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Impacto real</p>
              <p className="mt-4 text-3xl font-bold text-white">+120%</p>
              <p className="mt-3 text-sm leading-6 text-slate-400">Mejora en retención de estudiantes con cursos interactivos.</p>
            </div>
            <div className="rounded-3xl border border-slate-700/70 bg-slate-900/70 p-6 shadow-xl shadow-violet-500/10 backdrop-blur-xl">
              <p className="text-sm uppercase tracking-[0.3em] text-violet-300">Flexibilidad</p>
              <p className="mt-4 text-3xl font-bold text-white">Total</p>
              <p className="mt-3 text-sm leading-6 text-slate-400">Cursos, módulos y lecciones en una sola plataforma.</p>
            </div>
            <div className="rounded-3xl border border-slate-700/70 bg-slate-900/70 p-6 shadow-xl shadow-sky-500/10 backdrop-blur-xl">
              <p className="text-sm uppercase tracking-[0.3em] text-sky-300">Escalable</p>
              <p className="mt-4 text-3xl font-bold text-white">Para todos</p>
              <p className="mt-3 text-sm leading-6 text-slate-400">Ideal para creadores individuales, academias y empresas en crecimiento.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="bg-slate-950 px-6 py-24 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">Características clave</p>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Todo lo que necesitas para crear experiencias educativas modernas.</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-400">Diseñado para que la creación, gestión y análisis de tus cursos sea intuitiva, rápida y poderosa.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="rounded-[2rem] border border-slate-700/70 bg-slate-900/80 p-6 shadow-[0_30px_70px_-40px_rgba(15,23,42,0.8)]">
              <CardHeader>
                <CardTitle>Gestión estructurada</CardTitle>
              </CardHeader>
              <CardContent>
                Organiza cursos con módulos, lecciones y rutas de aprendizaje personalizadas para cada grupo.
              </CardContent>
            </Card>
            <Card className="rounded-[2rem] border border-slate-700/70 bg-slate-900/80 p-6 shadow-[0_30px_70px_-40px_rgba(15,23,42,0.8)]">
              <CardHeader>
                <CardTitle>Analíticas inteligentes</CardTitle>
              </CardHeader>
              <CardContent>
                Controla el progreso de tus estudiantes con métricas claras, tendencias y reportes en tiempo real.
              </CardContent>
            </Card>
            <Card className="rounded-[2rem] border border-slate-700/70 bg-slate-900/80 p-6 shadow-[0_30px_70px_-40px_rgba(15,23,42,0.8)]">
              <CardHeader>
                <CardTitle>Experiencia premium</CardTitle>
              </CardHeader>
              <CardContent>
                Plantillas profesionales, diseño amigable y una interfaz rápida que mejora la adopción de usuarios.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="pricing" className="bg-slate-900 px-6 py-24 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-violet-300">Precios</p>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Planes diseñados para tu crecimiento.</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-400">Sin cargos ocultos, con opciones para comenzar sin riesgo y escalar cuando estés listo.</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="rounded-[2rem] border border-slate-700/60 bg-slate-950/80 p-8 shadow-xl shadow-slate-950/40">
              <CardHeader>
                <CardTitle>Starter</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <p className="text-4xl font-extrabold text-cyan-300">Gratis</p>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li>Hasta 50 estudiantes</li>
                  <li>5 cursos activos</li>
                  <li>Soporte por email</li>
                </ul>
                <Button className="w-full bg-cyan-500 text-slate-950 hover:bg-cyan-400" asChild>
                  <Link href="/signup">Comenzar</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="rounded-[2rem] border border-cyan-500/30 bg-slate-950/95 p-8 shadow-[0_35px_80px_-30px_rgba(34,197,94,0.35)]">
              <CardHeader>
                <CardTitle>Pro</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <p className="text-4xl font-extrabold text-white">$29<span className="text-base font-medium text-slate-400">/mes</span></p>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li>Usuarios ilimitados</li>
                  <li>Cursos ilimitados</li>
                  <li>Analítica avanzada</li>
                </ul>
                <Button className="w-full bg-white text-slate-950 hover:bg-slate-100" asChild>
                  <Link href="/signup">Elegir Plan</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="rounded-[2rem] border border-slate-700/60 bg-slate-950/80 p-8 shadow-xl shadow-slate-950/40">
              <CardHeader>
                <CardTitle>Enterprise</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <p className="text-4xl font-extrabold text-slate-100">Custom</p>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li>Integraciones avanzadas</li>
                  <li>Soporte dedicado</li>
                  <li>Infraestructura personalizada</li>
                </ul>
                <Button variant="outline" className="w-full border-slate-500 text-slate-100 hover:border-white hover:text-white" asChild>
                  <Link href="/contact">Contactar</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-slate-950/90 px-6 py-24 sm:px-8">
        <div className="mx-auto max-w-6xl rounded-[2.5rem] border border-slate-700/60 bg-slate-900/80 p-12 text-center shadow-[0_40px_120px_-40px_rgba(15,23,42,0.9)] backdrop-blur-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-300">Prepárate</p>
          <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl">Lleva tu formación al siguiente nivel</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-400">Construye la experiencia educativa que tu comunidad merece, con una interfaz moderna, interacciones limpias y potencia de gestión profesional.</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="min-w-45 bg-cyan-500 text-slate-950 hover:bg-cyan-400" asChild>
              <Link href="/signup">Crear cuenta</Link>
            </Button>
            <Button variant="outline" size="lg" className="min-w-45 border-slate-500 text-slate-100 hover:border-white hover:text-white" asChild>
              <Link href="/signin">Ver demo</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
