import { Ingredient, User } from "./interface";

export const initIngredient: Ingredient = {
    id: null,
    name: "",
    keyname: "",
    expiredDate: ""
}

export const initUser: User = {
    id: null,
    username: "",
    password: "",
    role: "User",
    firstName: "",
    lastName: "",
    image: ""
}

export const ingredientData: string[] = [
    "Ayam",
    "Bawang Merah",
    "Bawang Putih",
    "Bawang Besar",
    "Cili Kering",
    "Garam Halus",
    "Garam Kasar",
    "Kicap Manis",
    "Kicap Masin",
    "Minyak Masak",
    "Sardin",
]