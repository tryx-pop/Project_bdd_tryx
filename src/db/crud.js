import { TodoModel } from "./models/TodoModel.js"

export const createTodo = async (todo) => {
  const newTodo = new TodoModel(todo)

  await newTodo.save()

  return newTodo
}
export const readTodos = async () => await TodoModel.find()
export const readTodo = async (todoId) => await TodoModel.findById(todoId)
export const updateTodo = async (
  todoId,
  input,
) => {
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


