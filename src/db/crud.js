import { readDatabase } from "./readDatabase.js"
import { writeDatabase } from "./writeDatabase.js"

export const createTodo = async ({ description, isDone = false }) => {
  const db = await readDatabase()
  const newLastId = db.lastId + 1
  const newTodo = {
    id: newLastId,
    description,
    isDone,
  }

  await writeDatabase({
    ...db,
    lastId: newLastId,
    todos: {
      ...db.todos,
      [newLastId]: newTodo,
    },
  })

  return newTodo
}
export const readTodos = async () => {
  const { todos } = await readDatabase()

  return Object.values(todos)
}
export const readTodo = async (todoId) => {
  const {
    todos: { [todoId]: todo },
  } = await readDatabase()

  return todo || null
}
export const updateTodo = async (
  todoId,
  { description = "", isDone = false },
) => {
  const db = await readDatabase()
  const todo = db.todos[todoId]
  const updatedTodo = {
    ...todo,
    description: description.trim() || todo.description,
    isDone: isDone ?? todo.isDone,
  }

  await writeDatabase({
    ...db,
    todos: {
      ...db.todos,
      [todoId]: updatedTodo,
    },
  })

  return updatedTodo
}
export const deleteTodo = async (todoId) => {
  const db = await readDatabase()
  const {
    todos: { [todoId]: todo, ...todos },
  } = db

  if (!todo) {
    return null
  }

  await writeDatabase({
    ...db,
    todos,
  })

  return todo
}
