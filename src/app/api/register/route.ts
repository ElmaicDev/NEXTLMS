import { NextResponse } from "next/server"
import { randomBytes } from "crypto"
import { prisma } from "@/lib/prisma"
import { Role } from "@/lib/generated/prisma/client"
import bcrypt from "bcryptjs"

function slugify(input: string): string {
    return (
        input
            .toLowerCase()
            .normalize("NFD")
            .replace(/[̀-ͯ]/g, "")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, "") || "user"
    )
}

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { name, email, password } = body

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email y contraseña son requeridos" },
                { status: 400 }
            )
        }

        if (password.length < 6) {
            return NextResponse.json(
                { error: "La contraseña debe tener al menos 6 caracteres" },
                { status: 400 }
            )
        }

        const existingUser = await prisma.user.findFirst({
            where: { email },
        })

        if (existingUser) {
            return NextResponse.json(
                { error: "El usuario ya existe" },
                { status: 409 }
            )
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const emailLocalPart = String(email).split("@")[0] || "user"
        const displayName =
            (typeof name === "string" && name.trim()) || emailLocalPart
        const tenantName = `${displayName} Workspace`
        const baseSlug = slugify(emailLocalPart)

        let user: { id: string } | null = null

        for (let attempt = 0; attempt < 5; attempt++) {
            const slug = `${baseSlug}-${randomBytes(2).toString("hex")}`
            try {
                user = await prisma.$transaction(async (tx) => {
                    const tenant = await tx.tenant.create({
                        data: { name: tenantName, slug },
                    })
                    return tx.user.create({
                        data: {
                            name: typeof name === "string" ? name : null,
                            email,
                            password: hashedPassword,
                            tenantId: tenant.id,
                            role: Role.ADMIN,
                        },
                        select: { id: true },
                    })
                })
                break
            } catch (err: unknown) {
                if ((err as { code?: string })?.code === "P2002") continue
                throw err
            }
        }

        if (!user) {
            return NextResponse.json(
                { error: "No se pudo generar un identificador único para el workspace" },
                { status: 500 }
            )
        }

        return NextResponse.json(
            { message: "Usuario creado correctamente", userId: user.id },
            { status: 201 }
        )
    } catch (error) {
        console.error("[REGISTER_ERROR]", error)

        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        )
    }
}
