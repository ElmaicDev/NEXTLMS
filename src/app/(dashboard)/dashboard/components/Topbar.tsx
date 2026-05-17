// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"

// export function Topbar() {
//   return (
//     <header className="h-16 border-b bg-background flex items-center justify-between px-6">

//       {/* SEARCH */}
//       <div className="w-full max-w-sm">
//         <Input placeholder="Buscar..." />
//       </div>

//       {/* ACTIONS */}
//       <div className="flex items-center gap-2">

//         <Button variant="ghost">
//           Notificaciones
//         </Button>

//         <Button variant="outline">
//           Perfil
//         </Button>

//       </div>

//     </header>
//   )
// }

// "use client"

// import { signOut } from "next-auth/react"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { User, Bell } from "lucide-react"

// export function Topbar() {

//   return (
//     <header className="h-16 border-b bg-background flex items-center justify-between px-6">

//       {/* SEARCH */}
//       <div className="w-full max-w-sm">
//         <Input placeholder="Buscar..." />
//       </div>

//       {/* ACTIONS */}
//       <div className="flex items-center gap-2">

//         <Button variant="ghost">
//           <Bell className="h-5 w-5" />
//         </Button>

//         <Button variant="outline">
//           <User className="h-5 w-5" />
//         </Button>

//         {/* SIGN OUT */}
//         <Button
//           variant="outline"
//           onClick={() =>
//             signOut({
//               callbackUrl: "/", // 👈 vuelve al landing
//             })
//           }
//         >
//           Cerrar sesión
//         </Button>

//       </div>

//     </header>
//   )
// }

"use client"

import { signOut, useSession } from "next-auth/react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { User, Bell, LogOut } from "lucide-react"

export function Topbar() {
  const { data: session } = useSession()

  return (
    <header className="h-16 border-b border-slate-700 bg-slate-900 flex items-center justify-between px-6">

      {/* SEARCH */}
      <div className="w-full max-w-xs">
        <Input 
          placeholder="Buscar cursos, estudiantes..." 
          className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
        />
      </div>

      {/* ACTIONS */}
      <div className="flex items-center gap-4 ml-auto">

        <Button variant="ghost" className="text-slate-300 hover:text-cyan-400 hover:bg-slate-800">
          <Bell className="h-5 w-5" />
        </Button>

        {/* USER INFO */}
        <div className="flex items-center gap-2 text-sm text-slate-300 px-3 py-2 bg-slate-800 rounded-lg">
          <User className="h-4 w-4" />
          <span className="hidden md:inline font-medium">
            {session?.user?.name || "Usuario"}
          </span>
        </div>

        {/* SIGN OUT */}
        <Button
          variant="outline"
          className="border-slate-700 text-slate-300 hover:bg-red-950 hover:border-red-700 hover:text-red-300"
          onClick={() =>
            signOut({
              callbackUrl: "/",
            })
          }
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden md:inline ml-2">Salir</span>
        </Button>

      </div>

    </header>
  )
}