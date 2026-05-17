import CreateLessonForm from "./CreateLessonForm"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function LessonsList({ module }: any) {
  return (
    <div className="space-y-3 ml-4">

      <CreateLessonForm moduleId={module.id} />

      {module.lessons.map((lesson: any) => (
        <div
          key={lesson.id}
          className="text-sm border p-2 rounded-md"
        >
          {lesson.title}
            <Link href={`/dashboard/lessons/${lesson.id}/edit`}>
              <Button size="sm" variant="outline">
                Editar
              </Button>
          </Link>
        </div>
        
      ))}

    </div>
  )
}