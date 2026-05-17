import { NextResponse } from "next/server"
import {prisma} from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function POST(req: Request) {
  const session = await auth()

  if (!session?.user?.tenantId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()

  const course = await prisma.course.create({
    data: {
      title: body.title,
      slug: body.title.toLowerCase().replace(/\s+/g, "-"),
      price: body.price,
      isFree: body.isFree,
      tenantId: session.user.tenantId,
      ownerId: session.user.id,
    },
  })

  return NextResponse.json(course)
}