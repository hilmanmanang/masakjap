import { Ingredient, User } from "./interface";

export const initIngredient: Ingredient = {
    id: null,
    name: "",
    qty: null,
    unit: ""
}

export const initUser: User = {
    id: null,
    email: "",
    password: "",
    name: "",
    role: "USER"
}