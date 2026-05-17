// import { Suspense } from "react"
// import CoursesTable from "./components/CoursesTable"

// export default function CoursesPage() {
//     return (
//         <div className="space-y-6">

//             <div>
//                 <h1 className="text-3xl font-bold">Courses</h1>
//                 <p className="text-muted-foreground">
//                     Gestiona tus cursos
//                 </p>
//             </div>

//             <Suspense fallback={<div>Cargando cursos...</div>}>
//                 <CoursesTable />
//             </Suspense>

//         </div>
//     )
// }

import { Suspense } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import CoursesTable from "./components/CoursesTable"

export default function CoursesPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-black text-white">Cursos</h1>
                    <p className="text-slate-400 mt-2">
                        Gestiona tus cursos y módulos
                    </p>
                </div>
                <Link href="/dashboard/courses/new">
                    <Button className="bg-cyan-500 text-slate-950 hover:bg-cyan-400 gap-2">
                        <Plus className="w-5 h-5" />
                        Crear curso
                    </Button>
                </Link>
            </div>

            <Suspense fallback={
                <div className="h-96 bg-slate-800/50 rounded-2xl animate-pulse"></div>
            }>
                <CoursesTable />
            </Suspense>

        </div>
    )
}