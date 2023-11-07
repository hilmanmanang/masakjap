"use client";
import { initIngredient } from "@/utils/constant";
import { Ingredient } from "@/utils/interface";
import { useContext, useState } from "react";
import { GlobalContext } from "./contextProps";

export const GlobalContextProvider = ({ children }: any) => {
    const [ingredientForm, setIngredientForm] = useState<Ingredient>(initIngredient)

    return (
        <GlobalContext.Provider value={{
            ingredientForm, setIngredientForm
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => useContext(GlobalContext)