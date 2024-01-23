/* eslint-disable no-console */
import chalk from "chalk"
import { readFile, writeFile } from "node:fs/promises"

const DB_PATH = "./db.json"
const readDatabase = async () => {
  try {
    const json = await readFile(DB_PATH, { encoding: "utf-8" })

    return JSON.parse(json)
  } catch (err) {
    return []
  }
}
const writeDatabase = async (db) => {
  const json = JSON.stringify(db)

  await writeFile(DB_PATH, json, { encoding: "utf-8" })
}
const formatTodo = (description, index) =>
  `${chalk.bgBlue(` ${String(index).padStart(4, " ")} `)} ${description}`
const printTodo = (description, index) =>
  console.log(formatTodo(description, index))
const [commandName, ...args] = process.argv.slice(2)
const commands = {
  add: async (rawDescription) => {
    const description = rawDescription.trim()

    if (!description) {
      console.error("Error: missing description argument")
      process.exit(2)
    }

    const todos = await readDatabase()
    const newTodos = [...todos, description]
    const index = newTodos.length - 1

    await writeDatabase(newTodos)
    printTodo(description, index)
    process.exit(0)
  },
  list: async () => {
    const todos = await readDatabase()

    todos.forEach(printTodo)
    process.exit(0)
  },
  delete: async (rawIndex) => {
    const index = Number.parseInt(rawIndex, 10)
    const todos = await readDatabase()
    const todo = todos[index]

    if (!todo) {
      console.error(
        `Error: missing or invalid index (must be 0-${todos.length - 1})`,
      )
      process.exit(2)
    }

    const newTodos = todos.filter((_, i) => i !== index)

    await writeDatabase(newTodos)
    printTodo(todo, index)
    process.exit(0)
  },
}
const command = commands[commandName]

if (!command) {
  console.error("Error: command not found")
  process.exit(1)
}

await command(...args)
