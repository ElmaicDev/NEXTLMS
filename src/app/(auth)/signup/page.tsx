// "use client"

// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

// export default function SignUpPage() {
//   return (
//     <div className="flex items-center justify-center min-h-screen px-4">
//       <Card className="w-full max-w-md">

//         <CardHeader className="text-center">
//           <CardTitle className="text-2xl font-bold">
//             Crear cuenta
//           </CardTitle>
//           <CardDescription>
//             Empieza a usar NextLMS gratis
//           </CardDescription>
//         </CardHeader>

//         <CardContent className="space-y-4">

//           <div className="space-y-2">
//             <Input placeholder="Nombre completo" />
//             <Input placeholder="Correo electrónico" type="email" />
//             <Input placeholder="Contraseña" type="password" />
//           </div>

//           <Button className="w-full">
//             Crear cuenta
//           </Button>

//           <div className="text-center text-sm text-muted-foreground">
//             ¿Ya tienes cuenta?{" "}
//             <Link href="/signin" className="text-primary hover:underline">
//               Inicia sesión
//             </Link>
//           </div>

//         </CardContent>
//       </Card>
//     </div>
//   )
// }

// "use client"

// import Link from "next/link"
// import { signIn } from "next-auth/react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

// export default function SignUpPage() {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">

//       {/* LEFT - FORM */}
//       <div className="flex items-center justify-center px-6">
//         <Card className="w-full max-w-md border-none shadow-none">

//           <CardHeader>
//             <CardTitle className="text-2xl font-bold">
//               Crear cuenta
//             </CardTitle>
//             <CardDescription>
//               Empieza a usar NextLMS gratis
//             </CardDescription>
//           </CardHeader>

//           <CardContent className="space-y-4">

//             <div className="space-y-2">
//               <Input placeholder="Nombre completo" />
//               <Input placeholder="Correo electrónico" type="email" />
//               <Input placeholder="Contraseña" type="password" />
//             </div>

//             <Button className="w-full">
//               Crear cuenta
//             </Button>

//             {/* SOCIAL LOGIN */}
//             <div className="space-y-2 pt-2">
//               <Button
//                 variant="outline"
//                 className="w-full"
//                 onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
//               >
//                 Continuar con Google
//               </Button>

//               <Button
//                 variant="outline"
//                 className="w-full"
//                 onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
//               >
//                 Continuar con GitHub
//               </Button>
//             </div>

//             <div className="text-center text-sm text-muted-foreground pt-2">
//               ¿Ya tienes cuenta?{" "}
//               <Link href="/signin" className="text-primary hover:underline">
//                 Inicia sesión
//               </Link>
//             </div>

//           </CardContent>
//         </Card>
//       </div>

//       {/* RIGHT - VISUAL */}
//       <div className="hidden md:flex items-center justify-center bg-black text-white relative overflow-hidden">

//         <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-950" />

//         <div className="relative text-center px-10">
//           <h2 className="text-3xl font-bold">
//             Educación digital moderna
//           </h2>
//           <p className="text-white/60 mt-4">
//             Crea cursos, gestiona estudiantes y escala tu conocimiento.
//           </p>
//         </div>

//       </div>

//     </div>
//   )
// }

"use client"

import Link from "next/link"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SignUpForm } from "../components/signup-form"

export default function SignUpPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen bg-slate-950">

      {/* LEFT - FORM */}
      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white">Crear cuenta</h1>
            <p className="text-slate-400 mt-2">Únete a la comunidad de NextLMS</p>
          </div>

          <div className="space-y-4">
            <SignUpForm />

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-slate-950 text-slate-400">o regístrate con</span>
              </div>
            </div>

            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full border-slate-700 text-slate-900 hover:bg-slate-800 hover:text-slate-100"
                onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              >
                Continuar con Google
              </Button>

              <Button
                variant="outline"
                className="w-full border-slate-700 text-slate-900 hover:bg-slate-800 hover:text-slate-100"
                onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
              >
                Continuar con GitHub
              </Button>
            </div>

            <div className="text-center text-sm text-slate-400 pt-2">
              ¿Ya tienes cuenta?{" "}
              <Link href="/signin" className="text-cyan-400 hover:text-cyan-300 font-medium">
                Inicia sesión aquí
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT - VISUAL */}
      <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-black relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />

        <div className="relative text-center px-10 z-10">
          <h2 className="text-4xl font-black text-white mb-4">
            Educación digital moderna
          </h2>
          <p className="text-slate-300 text-lg leading-relaxed max-w-sm">
            Crea cursos impactantes, gestiona estudiantes y escala tu conocimiento con herramientas profesionales.
          </p>
        </div>
      </div>

    </div>
  )
}