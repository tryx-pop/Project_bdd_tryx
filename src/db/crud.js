import { TodoModel } from "./models/TodoModel.js"

export const createTodo = async ({ description, isDone = false, codePostal, adresse, ville, pays }) => {
  const newTodo = new TodoModel({ description, isDone, codePostal, adresse, ville, pays })

  await newTodo.save()

  return newTodo
}
export const readTodos = async () => await TodoModel.find()
export const readTodo = async (todoId) => await TodoModel.findById(todoId)
export const updateTodo = async (
  todoId,
  { description = "", isDone = false },
) => {
  const input = {
    description: description.trim() || undefined,
    isDone: isDone ?? undefined,
  }
  const updatedTodo = await TodoModel.findByIdAndUpdate(todoId, input, {
    returnDocument: "after",
  })

  return updatedTodo
}
export const deleteTodo = async (todoId) => {
  const todo = await TodoModel.findOneAndDelete({ _id: todoId })

  if (!todo) {
    return null
  }

  return todo
}


