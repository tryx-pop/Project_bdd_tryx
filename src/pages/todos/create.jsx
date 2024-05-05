import { Button } from "@/components/Button"
import { Form } from "@/components/Form"
import { FormField } from "@/components/FormField"
import { codepostalValidator, nomValidator, isDoneValidator, villeValidator, paysValidator, adresseValidator, typeDelieuxValidator, prixDulieuxValidator, nombreDetoileValidator, typeDecuisineValidator, courantArtistiqueValidator, typeArtValidator, typeDebarValidator, typeDeParcValidator, pulicOupriverValidator } from "@/validators"
import axios from "axios"
import { Formik } from "formik"
import { useRouter } from "next/navigation"
import * as yup from "yup"

const initialValues = {
  nom: "",
  codePostal: "",
  ville: "",
  pays: "",
  adresse: "",
  typeDelieux: "",
  prixDulieux: "",
  nombreDetoile: "",
  typeDecuisine: "",
  courantArtistique: "",
  typeArt: "",
  typeDebar: "",
  typeDeParc: "",
  pulicOupriver: "",

}
const validationSchema = yup.object({
  nom: nomValidator,
  codePostal: codepostalValidator,
  ville: villeValidator,
  pays: paysValidator,
  adresse: adresseValidator,
  typeDelieux: typeDelieuxValidator,
  prixDulieux: prixDulieuxValidator,
  typeDecuisine: typeDecuisineValidator,
  nombreDetoile: nombreDetoileValidator,
  typeArt: typeArtValidator,
  courantArtistique: courantArtistiqueValidator,
  typeDebar: typeDebarValidator,
  pulicOupriver: pulicOupriverValidator,
  typeDeParc: typeDeParcValidator,
  
})
const typeFieldsConfig = {
  restaurant: [
    {
      name: "typeDecuisine",
      placeholder: "Entrer le type de cuisine",
      label: "type de cuisine"
    },
    {
      name: "nombreDetoile",
      placeholder: "Sélectionner le nombre d'étoiles",
      label: "Nombre d'étoiles"
    }
  ],
  musee: [
    {
      name: "courantArtistique",
      placeholder: "Entrer le courant Artistique",
      label: "type de courant Artistique"
    },
    {
      name: "typeArt",
      placeholder: "Sélectionner le type d'Art",
      label: "type d'art"
    }
  ],
  parc: [
    {
      name: "typeDeParc",
      placeholder: "Entrer le type Parc",
      label: "type de parc"
    },
    {
      name: "pulicOupriver",
      placeholder: "Sélectionner si il est public ou privé",
      label: "type public ou priver"
    }
  ],
  bar: [
    {
      name: "typeDebar",
      placeholder: "Entrer le type de Bar",
      label: "type de bar"
    }
  ]
}
const CreateTodoPage = () => {
    const router = useRouter()
  const handleSubmit = async(todo) => {
    await axios.post("http://localhost:3000/api/todos", todo)
    router.push("/todos")
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, handleChange, values, errors }) => (
        <Form onSubmit={handleSubmit}>
          {JSON.stringify(errors)}
          <FormField
            name="nom"
            placeholder="Enter le Nom"
            label="nom"
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
            name="adresse"
            label="adresse"
          />

          <div>
            <label htmlFor="typeDelieux">Type de Lieux:</label>
            <select id="typeDelieux" name="typeDelieux" onChange={handleChange} value={values.typeDelieux}>
              <option value="">Sélectionnez un type de lieu</option>
              <option value="musee">musée</option>
              <option value="parc">Parc</option>
              <option value="restaurant">Restaurant</option>
              <option value="bar">Bar</option>
            </select>
          </div>

          {/* Affichage dynamique des champs supplémentaires en fonction du type de lieu sélectionné */}
          {typeFieldsConfig[values.typeDelieux] && typeFieldsConfig[values.typeDelieux].map(field => (
            <FormField
              key={field.name}
              name={field.name}
              placeholder={field.placeholder}
              label={field.label}
            />
          ))}

          <div>
            <label htmlFor="prixDulieux">Prix de Lieux:</label>
            <select id="prixDulieux" name="prixDulieux" onChange={handleChange} value={values.prixDulieux}>
              <option value="">Sélectionnez un prix</option>
              <option value="gratuit">gratuit</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>

          <Button type="submit">Create</Button>
        </Form>
      )}
    </Formik> 
  )
}

export default CreateTodoPage
