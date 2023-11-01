import { initIngredient } from "@/utils/constant"
import { Ingredient } from "@/utils/interface"
import { Dispatch, SetStateAction, createContext } from "react"

export interface ContextProps {
    ingredientForm: Ingredient
    setIngredientForm: Dispatch<SetStateAction<Ingredient>>,
}

export const GlobalContext = createContext<ContextProps>({
    ingredientForm: initIngredient,
    setIngredientForm: (): Ingredient => initIngredient,
})