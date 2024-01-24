import { readDatabase } from "@/db/readDatabase"
import { writeDatabase } from "@/db/writeDatabase"

const handle = async (req, res) => {
  const db = await readDatabase()

  // Read (collection) => GET /todos
  if (req.method === "GET") {
    res.send(Object.values(db.todos))

    return
  }

  // Create (item) => POST /todos
  if (req.method === "POST") {
    const description = req.body.description.trim()

    if (!description) {
      res.status(422).send({ error: "missing description argument" })

      return
    }

    const newLastId = db.lastId + 1
    const newTodo = {
      id: newLastId,
      description,
    }

    await writeDatabase({
      ...db,
      lastId: newLastId,
      todos: {
        ...db.todos,
        [newLastId]: newTodo,
      },
    })
    res.send(newTodo)

    return
  }

  res.status(404).send({ error: "Not found" })
}

export default handle
