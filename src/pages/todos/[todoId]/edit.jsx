import { Button } from "@/components/Button"
import { Form } from "@/components/Form"
import { FormField } from "@/components/FormField"
import { descriptionValidator, isDoneValidator } from "@/validators"
import axios from "axios"
import { Formik } from "formik"
import { useRouter } from "next/router"
import * as yup from "yup"

export const getServerSideProps = async ({ query: { todoId } }) => {
  const { data: todo } = await axios(
    `http://localhost:3000/api/todos/${todoId}`,
  )

  return { props: { todo } }
}
const validationSchema = yup.object({
  description: descriptionValidator,
  isDone: isDoneValidator,
})
const TodoEditPage = ({ todo }) => {
  const router = useRouter()
  const initialValues = todo
  const handleSubmit = async (values) => {
    // eslint-disable-next-line no-underscore-dangle
    await axios.patch(`http://localhost:3000/api/todos/${todo._id}`, values)

    router.push("/todos")
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <FormField
          name="description"
          placeholder="Enter a description"
          label="Description"
        />
        <FormField
          className="items-center flex-row"
          name="isDone"
          type="checkbox"
          label="Done?"
        />
        <Button type="submit">Save</Button>
      </Form>
    </Formik>
  )
}

export default TodoEditPage
