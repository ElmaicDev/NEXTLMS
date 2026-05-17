import { NextResponse } from "next/server"
import {prisma} from "@/lib/prisma"
import bcrypt from "bcryptjs"

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

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        })

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