export interface Ingredient {
    id: number | null,
    name: string,
}

export interface IngredientList {
    id: number | null,
    name: string,
}

export interface User {
    id: number | null,
    username: string,
    password: string
    role: "User" | "Admin" | "Super Admin"
}