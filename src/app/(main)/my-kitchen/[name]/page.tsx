"use client"
import { PtBreadcrumb } from "@/components/ptBreadcrumb";
import { useGlobalContext } from "@/providers/context/globalContext";
import { initIngredient } from "@/utils/constant";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AutoComplete } from "primereact/autocomplete";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Account from "../../account/page";

export default function Name() {
    const router = useRouter()
    const { ingredientForm, setIngredientForm } = useGlobalContext()
    const { ingredientListName } = ingredientForm
    const { data: session } = useSession();
    const [ingredientData, setIngredientData] = useState<any[]>([])

    const items = [
        { label: "My Kitchen", url: "/my-kitchen" },
        { label: ingredientListName ? ingredientListName : "Create New", className: "text-success" }
    ]

    useEffect(() => {
        getAllIngredientList()
    }, [])

    const getAllIngredientList = async () => {
        const response = await fetch("/api/ingredientList/findMany", {
            method: "POST"
        })
        const datas = await response.json()
        setIngredientData(datas)
    }



    const [filteredIngredientList, setFilteredIngredientList] = useState<string[]>([])
    const searchIngredientList = (event: any) => {
        const { query } = event
        let filteredIngredientList: string[] = []
        for (let data of ingredientData) {
            if (data?.enname?.toUpperCase().includes(query.toUpperCase())) {
                filteredIngredientList.push(data?.enname)
            }
        }
        setFilteredIngredientList(filteredIngredientList);
    }

    const handleSubmit = async () => {
        const { id, expiredDate, ingredientListName } = ingredientForm

        const response = await fetch(id ? "/api/ingredient/update" : "/api/ingredient/create", {
            method: id ? "PUT" : "POST",
            body: JSON.stringify(id ? {
                id,
                expiredDate,
                ingredientListName: generateKeyName(ingredientListName)
            } : {
                expiredDate,
                ingredientListName: generateKeyName(ingredientListName)
            })
        })

        if (response.ok) {
            toast.success(`Ingredient ${name} is ${id ? 'updated' : 'created'}`)
            setIngredientForm(initIngredient)
            router.back()
        } else {
            toast.error("Unexpected error")
        }

    }

    const generateKeyName = (name: string): string => {
        return name.toLowerCase().trim()
    }

    if (true) {
        // if (session && session.user) {
        return (<div>
            <PtBreadcrumb items={items} />
            <div className="lg:max-w-[90rem] md:max-w-[87.5rem] max-w-[85rem] h-full mx-auto lg:px-[3.75rem] md:px-10 px-5">
                <div className="mt-10 mb-8 text-gray-900 font-medium text-2xl">{ingredientListName ? ingredientListName : "Create New Ingredient"}</div>
                <div className="mb-4">
                    <div className="text-gray-900 text-sm font-normal mb-2">Name*</div>
                    <AutoComplete
                        value={ingredientListName}
                        onChange={(e) => setIngredientForm({
                            ...ingredientForm,
                            ingredientListName: e.value
                        })}
                        suggestions={filteredIngredientList}
                        completeMethod={searchIngredientList}
                        placeholder="Insert name"
                        pt={{
                            root: {
                                className: "w-full"
                            },
                            input: {
                                root: {
                                    className: "shadow-none outline-none rounded-md h-12 px-3 w-full border border-gray-100 placeholder:text-gray-400"
                                }
                            }
                        }}
                    />
                </div>
                <div className="flex justify-end mt-8 gap-3">
                    <Button type="button" label="Back" className="text-gray-900 rounded-full bg-gray-50 px-8 py-[0.875rem] focus:shadow-none" onClick={() => router.back()} />
                    <Button type="button" label="Submit" disabled={!ingredientListName} className="text-white rounded-full bg-success px-8 py-[0.875rem] focus:shadow-none" onClick={handleSubmit} />
                </div>
            </div>
        </div>)
    } else {
        return <Account />
    }
}
