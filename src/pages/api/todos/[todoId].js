import { mw } from "@/api/mw"
import { deleteTodo, readTodo, updateTodo } from "@/db/crud"

const handle = mw(async (req, res) => {
  const { todoId } = req.query

  // Read (item) => GET /todos/:todoId
  if (req.method === "GET") {
    const todo = await readTodo(todoId)

    if (!todo) {
      res.status(404).send({ error: "Not found" })

      return
    }

    res.send(todo)

    return
  }

  // Update (item) => PATCH /todos/:todoId
  if (req.method === "PATCH") {
    const description = req.body.description?.trim()
    const { isDone } = req.body
    const updatedTodo = await updateTodo(todoId, { description, isDone })

    if (!updatedTodo) {
      res.status(404).send({ error: "Not found" })

      return
    }

    res.send(updatedTodo)

    return
  }

  // Delete (item) => DELETE /todos/:todoId
  if (req.method === "DELETE") {
    const todoToBeDelete = await deleteTodo(todoId)

    if (!todoToBeDelete) {
      res.status(404).send({ error: "Not found" })

      return
    }

    res.send(todoToBeDelete)

    return
  }

  res.status(404).send({ error: "Not found" })
})

export default handle
