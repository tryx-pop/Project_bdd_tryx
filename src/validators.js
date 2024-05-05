import { yupToFormErrors } from "formik"
import * as yup from "yup"

export const nomValidator = yup
  .string()
  .min(3)
  .required()
  .label("nom")
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
export const typeDelieuxValidator = yup
  .string()
  .required()
  .label("Type de Lieux")
  .oneOf(["musée", "parc", "restaurant", "bar",], "Type de lieu invalide")
export const prixDulieuxValidator = yup
  .string()
  .required()
  .label("Prix du Lieux")
  .oneOf(["gratuit", "1", "2", "3", "4", "5"], "Type de lieu invalide") 
export const typeDecuisineValidator = yup
  .string()
  .label("Type de cuisine")
export const nombreDetoileValidator = yup
  .string()
  .label("Nombre d'étoiles")
export const courantArtistiqueValidator = yup
  .string()
  .label("type de courant Artistique")
export const typeArtValidator = yup
  .string()
  .label("type d'art")
export const typeDebarValidator = yup
  .string()
  .label("type de bar")
export const typeDeParcValidator = yup
  .string()
  .label("type de parc")
export const pulicOupriverValidator = yup
  .string()
  .label("type public ou priver")
  