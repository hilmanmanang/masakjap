"use client";
import { initIngredient, initIngredientList } from "@/utils/constant";
import { Ingredient, IngredientList } from "@/utils/interface";
import { useContext, useState } from "react";
import { GlobalContext } from "./contextProps";

export const GlobalContextProvider = ({ children }: any) => {
    const [ingredientForm, setIngredientForm] = useState<Ingredient>(initIngredient)
    const [ingredientListForm, setIngredientListForm] = useState<IngredientList>(initIngredientList)

    return (
        <GlobalContext.Provider value={{
            ingredientForm, setIngredientForm,
            ingredientListForm, setIngredientListForm
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => useContext(GlobalContext)