export interface Ingredient {
    id: number | null
    name: string
    keyname: string
    expiredDate: string
}

export interface User {
    id: number | null
    username: string
    password: string
    role: "User" | "Admin" | "Super Admin",
    firstName: string,
    lastName: string,
    image: string | null | undefined
}