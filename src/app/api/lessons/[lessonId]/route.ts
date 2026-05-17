import {prisma} from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ lessonId: string }> }
) {
  try {
    const { lessonId } = await params
    const body = await req.json()

    console.log("PUT /api/lessons/[lessonId]")
    console.log("lessonId:", lessonId)
    console.log("body:", body)

    if (!body.content) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      )
    }

    const lesson = await prisma.lesson.update({
      where: { id: lessonId },
      data: {
        content: body.content,
      },
    })

    console.log("Lesson updated successfully:", lesson.id)
    return NextResponse.json(lesson)
  } catch (error) {
    console.error("Error updating lesson:", error)
    
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    
    return NextResponse.json(
      { 
        error: "Failed to update lesson",
        details: errorMessage,
      },
      { status: 500 }
    )
  }
}