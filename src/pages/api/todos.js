import { mw } from "@/api/mw"
import { createTodo, readTodos } from "@/db/crud"

const handle = mw(async (req, res) => {
  // Read (collection) => GET /todos
  if (req.method === "GET") {
    const todos = await readTodos()

    res.send(todos)

    return
  }

  // Create (item) => POST /todos
  if (req.method === "POST") {
    const newTodo = await createTodo(req.body)
    
    res.send(newTodo)

    return
  }

  res.status(404).send({ error: "Not found" })
})

export default handle
