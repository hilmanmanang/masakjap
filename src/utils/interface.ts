export interface Ingredient {
    id: number | null,
    ingredientListName: string,
    expiredDate: string
}

export interface IngredientList {
    id: number | null,
    keyname: string,
    myname: string,
    enname: string,
}

export interface User {
    id: number | null,
    username: string,
    password: string
    role: "User" | "Admin" | "Super Admin"
}