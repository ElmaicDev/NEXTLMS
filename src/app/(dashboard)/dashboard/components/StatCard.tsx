import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function StatCard({
    title,
    value,
}: {
    title: string
    value: string | number
}) {
    return (
        <Card className="rounded-2xl border border-slate-700 bg-slate-900 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-300">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-black text-cyan-400">
                    {value}
                </div>
                <p className="text-xs text-slate-500 mt-2">Métrica principal</p>
            </CardContent>
        </Card>
    )
}