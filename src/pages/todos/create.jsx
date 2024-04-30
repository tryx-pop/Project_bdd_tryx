import { Button } from "@/components/Button"
import { Form } from "@/components/Form"
import { FormField } from "@/components/FormField"
import { codepostalValidator, descriptionValidator, isDoneValidator, villeValidator, paysValidator, adresseValidator } from "@/validators"
import axios from "axios"
import { Formik } from "formik"
import * as yup from "yup"

const initialValues = {
  description: "",
  isDone: false,
  codePostal: "",
  ville: "",
  pays: "",
  adress: "",
}
const validationSchema = yup.object({
  description: descriptionValidator,
  isDone: isDoneValidator,
  codePostal: codepostalValidator,
  ville: villeValidator,
  pays: paysValidator,
  adress: adresseValidator,
})
const CreateTodoPage = () => {
  const handleSubmit = async ({ description, isDone, codePostal, ville, pays, adress }, { resetForm }) => {
    await axios.post("http://localhost:3000/api/todos", {
      description,
      isDone,
      codePostal,
      ville,
      pays,
      adress,
    })

    resetForm()
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <Form>
        <FormField
          name="description"
          placeholder="Enter a description"
          label="Description"
        />

        <FormField
          className="items-center flex-row"
          name="isDone"
          type="checkbox"
          label="Done?"
        />

        <FormField
          placeholder="entrer le Pays"
          name="pays"
          label="pays"
        />
        
        <FormField
          placeholder="entrer la Ville"
          name="ville"
          label="ville"
        />

        <FormField
          placeholder="entrer le Code Postal"
          name="codePostal"
          label="Code Postal"
        />

        <FormField
          placeholder="entrer l'adresse"
          name="adress"
          label="adress"
        />
        <Button type="submit">Create</Button>
      </Form>
    </Formik>
  )
}

export default CreateTodoPage
