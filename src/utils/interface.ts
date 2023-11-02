export interface Ingredient {
    id: number | null,
    name: string,
    qty: number | null,
    unit: string
}

export interface User {
    id: number | null,
    email: string,
    password: string
    name?: string,
    role: "USER" | "ADMIN" | "SUPERADMIN"
}