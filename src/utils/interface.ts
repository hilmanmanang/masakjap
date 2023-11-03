export interface Ingredient {
    id: number | null,
    name: string,
    qty: number | null,
    unit: string
}

export interface User {
    id: number | null,
    username: string,
    password: string
    role: "User" | "Admin" | "Super Admin"
}