import { Button } from "@/components/Button"
import { readDatabase } from "@/db/readDatabase"
import axios from "axios"
import clsx from "clsx"
import Link from "next/link"
import { useState } from "react"

export const getServerSideProps = async () => {
  const { todos } = await readDatabase()

  return {
    props: { initialTodos: Object.values(todos) },
  }
}
const TodosPage = ({ initialTodos }) => {
  const [todos, setTodos] = useState(initialTodos)
  const handleDelete = (todoId) => async () => {
    const deletedTodo = todos.find(({ id }) => id === todoId)
    const newTodos = todos.filter(({ id }) => id !== todoId)
    setTodos(newTodos)

    try {
      await axios.delete(`http://localhost:3000/api/todos/${todoId}`)
    } catch (err) {
      setTodos([...newTodos, deletedTodo])
    }
  }

  return (
    <ul className="flex flex-col gap-4">
      {todos.map(({ id, description, isDone }) => (
        <li key={id} className="flex items-center gap-2 group">
          <Link href={`/todos/${id}/edit`} className="flex gap-2 py-1">
            <span
              className={clsx("w-6 h-6 border border-green-500", {
                "bg-green-500": isDone,
              })}
            />{" "}
            #{id} {description}
          </Link>
          <Button
            onClick={handleDelete(id)}
            variant="danger"
            size="md"
            className="group-hover:inline hidden"
          >
            DELETE
          </Button>
        </li>
      ))}
    </ul>
  )
}

export default TodosPage
