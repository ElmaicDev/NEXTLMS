import CreateModuleForm from "./CreateModuleForm"
import LessonsList from "./LessonsList"

interface ModulesListProps {
  course: any
}

export default function ModulesList({ course }: ModulesListProps) {
  return (
    <div className="space-y-6">

      <CreateModuleForm courseId={course.id} />

      <p>{course.modules.length} modules, this course {course.id}</p>

      {course.modules.map((module: any) => (

        <div key={module.id} className="border rounded-md p-4">

          <h2 className="font-semibold mb-2">
            {module.title}
          </h2>

          <LessonsList module={module} />

        </div>
      ))}

    </div>
  )
}