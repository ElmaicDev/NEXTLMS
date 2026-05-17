import {prisma} from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json()

  const last = await prisma.lesson.findFirst({
    where: { moduleId: body.moduleId },
    orderBy: { position: "desc" },
  })

  const createdLesson = await prisma.lesson.create({
    data: {
      title: body.title,
      moduleId: body.moduleId,
      position: last ? last.position + 1 : 0,
    },
  })

  return NextResponse.json(createdLesson)
}