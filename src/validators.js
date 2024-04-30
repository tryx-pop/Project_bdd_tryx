import { yupToFormErrors } from "formik"
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
export const codepostalValidator = yup
  .string()
  .min(3)
  .required()
  .label("Code Postal")
export const villeValidator = yup
  .string()
  .min(1)
  .required()
  .label("ville")
export const paysValidator = yup
  .string()
  .min(2)
  .required()
  .label("pays")
export const adresseValidator = yup
  .string()
  .min(10)
  .required()
  .label("adresse")