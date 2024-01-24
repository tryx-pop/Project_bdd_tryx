import { readDatabase } from "@/db/readDatabase"
import { writeDatabase } from "@/db/writeDatabase"

const handle = async (req, res) => {
  const todoId = Number.parseInt(req.query.todoId, 10)
  const db = await readDatabase()
  const todo = db.todos[todoId]

  if (!todo) {
    res.status(404).send({ error: "Not found" })

    return
  }

  // Read (item) => GET /todos/:todoId
  if (req.method === "GET") {
    res.send(todo)

    return
  }

  // Update (item) => PATCH /todos/:todoId
  if (req.method === "PATCH") {
    const description = req.body.description?.trim() || todo.description
    const isDone = req.body.isDone ?? todo.isDone
    const updatedTodo = {
      ...todo,
      description,
      isDone,
    }

    await writeDatabase({
      ...db,
      todos: {
        ...db.todos,
        [todoId]: updatedTodo,
      },
    })
    res.send(updatedTodo)

    return
  }

  // Delete (item) => DELETE /todos/:todoId
  if (req.method === "DELETE") {
    const {
      todos: { [todoId]: todoToBeDelete, ...todos },
    } = db

    await writeDatabase({
      ...db,
      todos,
    })
    res.send(todoToBeDelete)

    return
  }

  res.status(404).send({ error: "Not found" })
}

export default handle
