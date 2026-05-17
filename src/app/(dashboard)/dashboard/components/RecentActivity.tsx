import {prisma} from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, User } from "lucide-react"

export default async function RecentActivity({ tenantId }: { tenantId: string }) {
    const enrollments = await prisma.enrollment.findMany({
        where: {
            course: { tenantId },
        },
        include: {
            user: true,
            course: true,
        },
        orderBy: {
            createdAt: "desc",
        },
        take: 5,
    })

    return (
        <Card className="rounded-2xl border border-slate-700 bg-slate-900 shadow-lg">
            <CardHeader>
                <CardTitle className="text-white">Actividad reciente</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {enrollments.length === 0 ? (
                        <p className="text-slate-400 text-sm">No hay actividad reciente</p>
                    ) : (
                        enrollments.map((e) => (
                            <div key={e.id} className="flex items-center gap-3 pb-3 border-b border-slate-700 last:border-0">
                                <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                                    <User className="w-5 h-5 text-cyan-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-white font-medium truncate">
                                        {e.user.name}
                                    </p>
                                    <p className="text-xs text-slate-400 truncate">
                                        Se inscribió en {e.course.title}
                                    </p>
                                </div>
                                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                            </div>
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    )
}