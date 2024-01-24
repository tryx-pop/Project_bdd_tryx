import { createTodo, readTodos } from "@/db/crud"

const handle = async (req, res) => {
  // Read (collection) => GET /todos
  if (req.method === "GET") {
    const todos = await readTodos()

    res.send(todos)

    return
  }

  // Create (item) => POST /todos
  if (req.method === "POST") {
    const description = req.body.description.trim()

    if (!description) {
      res.status(422).send({ error: "missing description argument" })

      return
    }

    const newTodo = await createTodo({ description })

    res.send(newTodo)

    return
  }

  res.status(404).send({ error: "Not found" })
}

export default handle
