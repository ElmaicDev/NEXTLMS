"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function CourseForm() {
    const router = useRouter()

    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [isFree, setIsFree] = useState(true)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const res = await fetch("/api/courses", {
            method: "POST",
            body: JSON.stringify({
                title,
                price: isFree ? null : Number(price),
                isFree,
            }),
        })

        if (res.ok) {
            router.push("/dashboard/courses")
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">

            <Input
                placeholder="Título del curso"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />

            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    checked={isFree}
                    onChange={(e) => setIsFree(e.target.checked)}
                />
                <span>Curso gratuito</span>
            </div>

            {!isFree && (
                <Input
                    type="number"
                    placeholder="Precio"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
            )}

            <Button type="submit">
                Crear curso
            </Button>

        </form>
    )
}