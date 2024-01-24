/* eslint-disable no-console */
import chalk from "chalk"
import {
  createTodo,
  deleteTodo,
  readTodo,
  readTodos,
  updateTodo,
} from "./db/crud.js"

const parseTodoId = (rawTodoId) => {
  const todoId = Number.parseInt(rawTodoId, 10)

  if (!todoId) {
    console.error("Error: missing todo ID")
    process.exit(2)
  }

  return todoId
}
const formatTodo = ({ id, description, isDone }) =>
  (isDone ? chalk.strikethrough : (x) => x)(
    `${chalk.bgBlue(` ${String(id).padStart(4, " ")} `)} ${description}`,
  )
const printTodo = (todo) => console.log(formatTodo(todo))
const [commandName, ...args] = process.argv.slice(2)
const commands = {
  add: async (rawDescription) => {
    const description = rawDescription.trim()

    if (!description) {
      console.error("Error: missing description argument")
      process.exit(2)
    }

    const newTodo = await createTodo({ description })
    printTodo(newTodo)
  },
  list: async () => {
    const todos = await readTodos()

    todos.forEach(printTodo)
  },
  delete: async (rawTodoId) => {
    const todoId = parseTodoId(rawTodoId)
    const todo = await deleteTodo(todoId)

    if (!todo) {
      console.error(`Error: no such todo (ID=${todoId})`)
      process.exit(2)
    }

    printTodo(todo)
  },
  toggle: async (rawTodoId) => {
    const todoId = parseTodoId(rawTodoId)
    const todo = await readTodo(todoId)

    if (!todo) {
      console.error(`Error: no such todo (ID=${todoId})`)
      process.exit(2)
    }

    const updatedTodo = await updateTodo(todoId, { isDone: !todo.isDone })

    printTodo(updatedTodo)
  },
}
const command = commands[commandName]

if (!command) {
  console.error("Error: command not found")
  process.exit(1)
}

await command(...args)
process.exit(0)
