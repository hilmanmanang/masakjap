"use client";
import { initIngredient, initUser } from "@/utils/constant";
import { Ingredient, User } from "@/utils/interface";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "./contextProps";
import { useSession } from "next-auth/react";

export const GlobalContextProvider = ({ children }: any) => {
    const [ingredientForm, setIngredientForm] = useState<Ingredient>(initIngredient)
    const [userLogin, setUserLogin] = useState<User>(initUser)

    const { data: session } = useSession();

    useEffect(() => {
        if (session?.user) {
            getUserByUsername(session.user?.email || '')
        }
    }, [session])

    const getUserByUsername = async (email: string) => {
        const response = await fetch("/api/user/findFirst", {
            method: "POST",
            body: JSON.stringify({
                username: email
            })
        })
        const user = await response.json()
        setUserLogin(user)
    }

    return (
        <GlobalContext.Provider value={{
            ingredientForm, setIngredientForm,
            userLogin, setUserLogin
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => useContext(GlobalContext)