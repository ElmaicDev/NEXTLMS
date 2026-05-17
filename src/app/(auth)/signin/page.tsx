// "use client"

// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

// export default function SignInPage() {
//   return (
//     <div className="flex items-center justify-center min-h-screen px-4">
//       <Card className="w-full max-w-md">
        
//         <CardHeader className="text-center">
//           <CardTitle className="text-2xl font-bold">
//             Bienvenido a NextLMS
//           </CardTitle>
//           <CardDescription>
//             Inicia sesión para acceder a tu dashboard
//           </CardDescription>
//         </CardHeader>

//         <CardContent className="space-y-4">

//           <div className="space-y-2">
//             <Input placeholder="Correo electrónico" type="email" />
//             <Input placeholder="Contraseña" type="password" />
//           </div>

//           <Button className="w-full">
//             Iniciar sesión
//           </Button>

//           <div className="text-center text-sm text-muted-foreground">
//             ¿No tienes cuenta?{" "}
//             <Link href="/signup" className="text-primary hover:underline">
//               Regístrate
//             </Link>
//           </div>

//         </CardContent>
//       </Card>
//     </div>
//   )
// }

"use client"

import Link from "next/link"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen bg-slate-950">

      {/* LEFT - FORM */}
      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white">Bienvenido</h1>
            <p className="text-slate-400 mt-2">Inicia sesión en tu cuenta</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">Correo electrónico</label>
              <Input
                placeholder="usuario@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">Contraseña</label>
              <Input
                placeholder="••••••••"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
              />
            </div>

            <Button
              className="w-full bg-cyan-500 text-slate-950 hover:bg-cyan-400 font-semibold h-11"
              onClick={() =>
                signIn("credentials", {
                  email,
                  password,
                  callbackUrl: "/dashboard",
                })
              }
            >
              Iniciar sesión
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-slate-950 text-slate-400">o continúa con</span>
              </div>
            </div>

            <div className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full border-slate-700 text-slate-100 hover:bg-slate-800"
                onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              >
                Continuar con Google
              </Button>

              <Button 
                variant="outline" 
                className="w-full border-slate-700 text-slate-100 hover:bg-slate-800"
                onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
              >
                Continuar con GitHub
              </Button>
            </div>

            <div className="text-center text-sm text-slate-400 pt-2">
              ¿No tienes cuenta?{" "}
              <Link href="/signup" className="text-cyan-400 hover:text-cyan-300 font-medium">
                Regístrate aquí
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT - VISUAL */}
      <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-black relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl" />

        <div className="relative text-center px-10 z-10">
          <h2 className="text-4xl font-black text-white mb-4">
            Aprende. Enseña. Escala.
          </h2>
          <p className="text-slate-300 text-lg leading-relaxed max-w-sm">
            NextLMS es la forma moderna de gestionar educación digital con herramientas poderosas y diseño elegante.
          </p>
        </div>
      </div>

    </div>
  )
}