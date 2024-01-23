import { readDatabase } from "@/db/readDatabase"
import { writeDatabase } from "@/db/writeDatabase"

const handle = async (req, res) => {
  const todos = await readDatabase()

  // Read (collection) => GET /todos
  if (req.method === "GET") {
    res.send(
      todos.map((description, index) => ({
        index,
        description,
      })),
    )

    return
  }

  if (req.method === "POST") {
    const description = req.body.description.trim()

    if (!description) {
      res.status(422).send({ error: "missing description argument" })

      return
    }

    const newTodos = [...todos, description]
    const index = newTodos.length - 1

    await writeDatabase(newTodos)
    res.send({
      index,
      description,
    })

    return
  }

  res.status(404).send({ error: "Not found" })
}

export default handle
