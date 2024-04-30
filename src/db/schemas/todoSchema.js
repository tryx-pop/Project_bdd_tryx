import { Schema } from "mongoose"
import { string } from "yup"

export const todoSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  isDone: {
    type: Boolean,
    required: true,
  },
  codePostal: {
    type: String,
    required: true,
  },
  ville: {
    type: String,
    required: true,
  },
  pays: {
    type: String,
    required: true,
  },
  adresse: {
    type: String,
    required: true,
  }
})
