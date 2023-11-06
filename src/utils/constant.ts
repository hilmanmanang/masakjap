import { Ingredient, IngredientList, User } from "./interface";

export const initIngredient: Ingredient = {
    id: null,
    ingredientListName: "",
    expiredDate: "06/11/2023"
}

export const initIngredientList: IngredientList = {
    id: null,
    keyname: "",
    myname: "",
    enname: ""
}

export const initUser: User = {
    id: null,
    username: "",
    password: "",
    role: "User"
}