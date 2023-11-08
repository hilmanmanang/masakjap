import { initIngredient, initUser } from "@/utils/constant"
import { Ingredient, User } from "@/utils/interface"
import { Dispatch, SetStateAction, createContext } from "react"

export interface ContextProps {
    ingredientForm: Ingredient
    setIngredientForm: Dispatch<SetStateAction<Ingredient>>,
    userLogin: User,
    setUserLogin: Dispatch<SetStateAction<User>>
}

export const GlobalContext = createContext<ContextProps>({
    ingredientForm: initIngredient,
    setIngredientForm: (): Ingredient => initIngredient,
    userLogin: initUser,
    setUserLogin: (): User => initUser
})