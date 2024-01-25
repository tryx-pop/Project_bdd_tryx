import axios from "axios"
import { ErrorMessage, Field, Form, Formik } from "formik"
import * as yup from "yup"

const initialValues = {
  description: "",
  isDone: false,
}
const validationSchema = yup.object({
  description: yup.string().min(3).required().label("Description"),
})
const CreateTodoPage = () => {
  const handleSubmit = async ({ description, isDone }, { resetForm }) => {
    await axios.post("http://localhost:3000/api/todos", {
      description,
      isDone,
    })

    resetForm()
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <Form className="flex flex-col gap-4">
        <Field
          name="description"
          className="border-2 focus:border-indigo-400 outline-none px-3 py-2"
          placeholder="Enter a description"
        />
        <ErrorMessage
          component="p"
          className="text-sm text-red-500"
          name="description"
        />
        <label className="flex items-center">
          <Field
            name="isDone"
            type="checkbox"
            className="border-2 focus:border-indigo-400 outline-none w-6 h-6 me-4"
          />
          Done?
        </label>
        <button
          type="submit"
          className="bg-indigo-600 active:bg-indigo-700 text-white text-lg font-semibold px-4 py-3"
        >
          Create
        </button>
      </Form>
    </Formik>
  )
}

export default CreateTodoPage
