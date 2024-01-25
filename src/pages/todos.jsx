import { readDatabase } from "@/db/readDatabase"
import clsx from "clsx"
import Link from "next/link"

export const getServerSideProps = async () => {
  const { todos } = await readDatabase()

  return {
    props: { todos: Object.values(todos) },
  }
}
const TodosPage = ({ todos }) => (
  <ul className="flex flex-col gap-4">
    {todos.map(({ id, description, isDone }) => (
      <li key={id}>
        <Link href={`/todos/${id}/edit`} className="flex gap-2">
          <span
            className={clsx("w-6 h-6 border border-green-500", {
              "bg-green-500": isDone,
            })}
          />{" "}
          #{id} {description}
        </Link>
      </li>
    ))}
  </ul>
)

export default TodosPage
