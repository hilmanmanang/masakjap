import { initIngredient, initIngredientList } from "@/utils/constant"
import { Ingredient, IngredientList } from "@/utils/interface"
import { Dispatch, SetStateAction, createContext } from "react"

export interface ContextProps {
    ingredientForm: Ingredient
    setIngredientForm: Dispatch<SetStateAction<Ingredient>>,
    ingredientListForm: IngredientList 
    setIngredientListForm: Dispatch<SetStateAction<IngredientList>>
}

export const GlobalContext = createContext<ContextProps>({
    ingredientForm: initIngredient,
    setIngredientForm: (): Ingredient => initIngredient,
    ingredientListForm: initIngredientList,
    setIngredientListForm: (): IngredientList => initIngredientList
})