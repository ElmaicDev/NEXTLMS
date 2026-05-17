// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// export default function DashboardPage() {
//   return (
//     <div className="space-y-6">

//       {/* HEADER */}
//       <div>
//         <h1 className="text-3xl font-bold">
//           Dashboard
//         </h1>
//         <p className="text-muted-foreground">
//           Resumen general de NextLMS
//         </p>
//       </div>

//       {/* STATS */}
//       <div className="grid gap-4 md:grid-cols-3">

//         <Card>
//           <CardHeader>
//             <CardTitle>Estudiantes</CardTitle>
//           </CardHeader>
//           <CardContent className="text-2xl font-bold">
//             1,240
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Cursos</CardTitle>
//           </CardHeader>
//           <CardContent className="text-2xl font-bold">
//             32
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Progreso</CardTitle>
//           </CardHeader>
//           <CardContent className="text-2xl font-bold">
//             78%
//           </CardContent>
//         </Card>

//       </div>

//       {/* CHART PLACEHOLDER */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Actividad reciente</CardTitle>
//         </CardHeader>
//         <CardContent className="h-64 flex items-center justify-center text-muted-foreground">
//           Aquí puedes conectar Recharts o Grafana luego
//         </CardContent>
//       </Card>

//     </div>
//   )
// }

import { auth } from "@/lib/auth"
import { Suspense } from "react"
import Stats from "./components/Stats"
import RecentActivity from "./components/RecentActivity"

export default async function DashboardPage() {
    const session = await auth()

    if (!session?.user?.tenantId) {
      throw new Error("Usuario sin tenant asignado")
    }

    const tenantId = session.user.tenantId

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-black text-white">Dashboard</h1>
        <p className="text-slate-400 mt-2">
          Bienvenido, {session?.user?.name}. Aquí está tu resumen de actividad.
        </p>
      </div>

      {/* STATS con Suspense */}
      <Suspense fallback={
        <div className="grid gap-4 md:grid-cols-3">
          {[1,2,3].map((i) => (
            <div key={i} className="h-32 bg-slate-800/50 rounded-2xl animate-pulse"></div>
          ))}
        </div>
      }>
        <Stats tenantId={tenantId} />
      </Suspense>

      {/* ACTIVIDAD con Suspense */}
      <Suspense fallback={
        <div className="h-80 bg-slate-800/50 rounded-2xl animate-pulse"></div>
      }>
        <RecentActivity tenantId={tenantId} />
      </Suspense>

    </div>
  )
}