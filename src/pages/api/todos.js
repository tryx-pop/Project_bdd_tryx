import { readDatabase } from "@/db/readDatabase"

const handle = async (req, res) => {
  const todos = await readDatabase()

  // Read (collection) => GET /todos
  if (req.method === "GET") {
    res.send(todos)

    return
  }

  res.status(404).send({ error: "Not found" })
}

export default handle
