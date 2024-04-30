import { Button } from "@/components/Button"
import axios from "axios"
import clsx from "clsx"
import Link from "next/link"
import { useState } from "react"

export const getServerSideProps = async () => {
  const {data: todos } = await axios("http://localhost:3000/api/todos")

  return {
    props: { initialTodos: Object.values(todos) },
  }
}
const TodosPage = ({ initialTodos }) => {
  const [todos, setTodos] = useState(initialTodos)
  const handleDelete = (todoId) => async () => {
    const deletedTodo = todos.find(({ _id }) => _id === todoId)
    const newTodos = todos.filter(({ _id }) => _id !== todoId)
    setTodos(newTodos)
    console.log(newTodos);

    try {
      await axios.delete(`http://localhost:3000/api/todos/${todoId}`)
    } catch (err) {
      setTodos([...newTodos, deletedTodo])
    }
  }

  return (
    <ul className="flex flex-col gap-4">
      {todos.map(({ _id, description, isDone }) => (
        <li key={_id} className="group flex items-center gap-2">
          <Link href={`/todos/${_id}/edit`} className="flex gap-2 py-1">
            <span
              className={clsx("h-6 w-6 border border-green-500", {
                "bg-green-500": isDone,
              })}
            />{" "}
            {description}
          </Link>
          <Button
            onClick={handleDelete(_id)}
            variant="danger"
            size="md"
            className="hidden group-hover:inline"
          >
            DELETE
          </Button>
        </li>
      ))}
    </ul>
  )
}

export default TodosPage
