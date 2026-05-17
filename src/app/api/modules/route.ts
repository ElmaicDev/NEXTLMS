import {prisma} from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json()

  const last = await prisma.module.findFirst({
    where: { courseId: body.courseId },
    orderBy: { position: "desc" },
  })

  const createdModule = await prisma.module.create({
    data: {
      title: body.title,
      courseId: body.courseId,
      position: last ? last.position + 1 : 0,
    },
  })

  return NextResponse.json(createdModule)
}