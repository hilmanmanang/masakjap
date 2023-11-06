"use client"
import { PtBreadcrumb } from "@/components/ptBreadcrumb";
import { useGlobalContext } from "@/providers/context/globalContext";
import { Ingredient } from "@/utils/interface";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Account from "../account/page";

export default function MyKitchen() {
    const items = [{ label: "My Kitchen", className: "text-success" }]
    const router = useRouter()
    const { data: session } = useSession();

    const [ingredients, setIngredients] = useState<Ingredient[]>([])
    const { setIngredientForm } = useGlobalContext()

    useEffect(() => {
        getAllIngredients()
    }, [])

    const getAllIngredients = async () => {
        const response = await fetch("/api/ingredient/findMany", {
            method: "POST"
        })
        const datas = await response.json()
        setIngredients(datas)
    }

    const actionBodyTemplate = (ingredient: Ingredient) => {
        return (<div className="flex flex-row gap-2 justify-end">
            <Button type="button" icon="pi pi-trash" className="text-gray-900 rounded-full bg-gray-50 hover:text-white hover:bg-success p-[0.625rem] focus:shadow-none" onClick={() => deleteIngredient(ingredient)} />
            <Button type="button" icon="pi pi-eye" className="text-gray-900 rounded-full bg-gray-50 hover:text-white hover:bg-success p-[0.625rem] focus:shadow-none" onClick={() => openIngredient(ingredient)} />
        </div>)
    }

    const openIngredient = (ingredient: Ingredient) => {
        const { id, ingredientListName, expiredDate } = ingredient

        setIngredientForm({
            id,
            ingredientListName,
            expiredDate
        })

        router.push("/my-kitchen/" + id)
    }

    const deleteIngredient = async (ingredient: Ingredient) => {
        const response = await fetch("/api/ingredient/delete", {
            method: "DELETE",
            body: JSON.stringify(ingredient)
        })

        if (response.ok) {
            toast.success(`Ingredient ${ingredient.ingredientListName} is deleted.`)
            getAllIngredients()
        }
    }

    if (true) {
        // if (session && session.user) {
        return (<div>
            <PtBreadcrumb items={items} />
            <div className="lg:max-w-[90rem] md:max-w-[87.5rem] max-w-[85rem] h-full mx-auto lg:px-[3.75rem] md:px-10 px-5">
                <div className="mt-10 mb-8 text-gray-900 font-semibold text-[2rem] text-center">My Kitchen</div>
                <div className="flex justify-end mb-8">
                    <Button type="button" label="Create New Ingredient" className="text-white rounded-full bg-success px-8 py-[0.875rem] focus:shadow-none" onClick={() => router.push("/my-kitchen/new")} />
                </div>
                <DataTable value={ingredients}>
                    <Column field="name.enname" header="NAME" sortable />
                    <Column
                        className="w-52"
                        header="ACTION"
                        body={actionBodyTemplate}
                        align="right">
                    </Column>
                </DataTable>
            </div>
        </div>)
    } else {
        return <Account />
    }
}