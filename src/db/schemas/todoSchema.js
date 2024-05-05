import { Schema } from "mongoose"
import { string } from "yup"


export const todoSchema = new Schema({
  nom: {
    type: String,
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
  },
  typeDelieux: {
    type: String,
    enum: ["musee", "parc", "restaurant", "bar",],
    required: true,
  },

  prixDulieux: {
    type: String,
    enum: ["gratuit", "1", "2", "3", "4", "5"],
    required: true,
  },

   typeDebar: {
    type: String,
    //enum: ["Bar a vin", "Bar a cocktail","PUB","Dive Bar"],
  },
   
    typeDeParc: {
    type: String,
    //enum: ["parc floral", "parc forestier", "parc zoologique"],
  },

  pulicOupriver: {
    type: String,
    //enum: ["public", "privée"],
  },

    courantArtistique: {
    type: String,
    //enum: ["Rococo","Baroque","Romantisme"],
  },
  typeArt: {
    type: String,
    //enum: ["peinture","sculture","street art"],
  },

    typeDecuisine: {
    type: String,
    //enum: ["indien","italien","francais","chinois","japonais"],
  },

  nombreDetoile: {
    type: String,
    //enum: ["1","2","3","4","5"],
  },
})



