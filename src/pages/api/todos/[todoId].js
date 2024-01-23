import { readDatabase } from "@/db/readDatabase"

const handle = async (req, res) => {
  const todoId = Number.parseInt(req.query.todoId, 10)
  const todos = await readDatabase()
  const todo = todos[todoId]

  if (!todo) {
    res.status(404).send({ error: "Not found" })

    return
  }

  if (req.method === "GET") {
    res.send()

    return
  }

  if (req.method === "PATCH") {
    res.send()

    return
  }

  if (req.method === "DELETE") {
    res.send()

    return
  }

  res.status(404).send({ error: "Not found" })
}

export default handle
