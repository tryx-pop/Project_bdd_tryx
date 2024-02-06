import mongoose from "mongoose"
import { todoSchema } from "../schemas/todoSchema"

export const TodoModel =
  mongoose.models.Todo || mongoose.model("Todo", todoSchema)
