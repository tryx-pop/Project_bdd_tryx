import { readDatabase } from "@/db/readDatabase"
import { writeDatabase } from "@/db/writeDatabase"

const handle = async (req, res) => {
  const todoId = Number.parseInt(req.query.todoId, 10)
  const todos = await readDatabase()
  const todo = todos[todoId]

  if (!todo) {
    res.status(404).send({ error: "Not found" })

    return
  }

  // Read (item) => GET /todos/:todoId
  if (req.method === "GET") {
    res.send({
      id: todoId,
      description: todo,
    })

    return
  }

  // Update (item) => PATCH /todos/:todoId
  if (req.method === "PATCH") {
    const description = req.body.description.trim()

    if (!description) {
      res.status(422).send({ error: "Invalid argument `description`" })

      return
    }

    const newTodos = todos.with(todoId, description)

    await writeDatabase(newTodos)
    res.send({
      index: todoId,
      description,
    })

    return
  }

  // Delete (item) => DELETE /todos/:todoId
  if (req.method === "DELETE") {
    const newTodos = todos.filter((_, index) => index !== todoId)

    await writeDatabase(newTodos)
    res.send({
      id: todoId,
      description: todo,
    })

    return
  }

  res.status(404).send({ error: "Not found" })
}

export default handle
