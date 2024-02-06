/* eslint-disable no-console */
import axios from "axios"
import chalk from "chalk"

const parseTodoId = (rawTodoId) => {
  const todoId = Number.parseInt(rawTodoId, 10)

  if (!todoId) {
    console.error("Error: missing todo ID")
    process.exit(2)
  }

  return todoId
}
const formatTodo = ({ _id, description, isDone }) =>
  (isDone ? chalk.strikethrough : (x) => x)(
    `${chalk.bgBlue(` ${String(_id).padStart(4, " ")} `)} ${description}`,
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

    const { data: newTodo } = await axios.post(
      "http://localhost:3000/api/todos",
      {
        description,
      },
    )
    printTodo(newTodo)
  },
  list: async () => {
    const { data: todos } = await axios("http://localhost:3000/api/todos")

    todos.forEach(printTodo)
  },
  delete: async (rawTodoId) => {
    const todoId = parseTodoId(rawTodoId)

    try {
      const { data: todo } = await axios.delete(
        `http://localhost:3000/api/todos/${todoId}`,
      )

      printTodo(todo)
    } catch (err) {
      console.error(`Error: no such todo (ID=${todoId})`)
      process.exit(2)
    }
  },
  toggle: async (rawTodoId) => {
    const todoId = parseTodoId(rawTodoId)

    try {
      const { data: todo } = await axios(
        `http://localhost:3000/api/todos/${todoId}`,
      )
      const { data: updatedTodo } = await axios.patch(
        `http://localhost:3000/api/todos/${todoId}`,
        { isDone: !todo.isDone },
      )

      printTodo(updatedTodo)
    } catch (err) {
      console.error(`Error: no such todo (ID=${todoId})`)
      process.exit(2)
    }
  },
}
const command = commands[commandName]

if (!command) {
  console.error("Error: command not found")
  process.exit(1)
}

await command(...args)
process.exit(0)
