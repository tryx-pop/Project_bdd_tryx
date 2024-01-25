import * as yup from "yup"

export const descriptionValidator = yup
  .string()
  .min(3)
  .required()
  .label("Description")
export const isDoneValidator = yup
  .boolean()
  .default(false)
  .required()
  .label("Done")
