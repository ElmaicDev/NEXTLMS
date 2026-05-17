import CourseForm from "../components/CourseForm"

export default function NewCoursePage() {
  return (
    <div className="space-y-6 max-w-2xl">

      <div>
        <h1 className="text-3xl font-bold">Crear curso</h1>
        <p className="text-muted-foreground">
          Configura la información básica del curso
        </p>
      </div>

      <CourseForm />

    </div>
  )
}