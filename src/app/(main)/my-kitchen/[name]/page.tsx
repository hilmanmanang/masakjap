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
import { useState } from "react";
import { toast } from "react-toastify";
import Account from "../../account/page";

export default function Name() {
    const router = useRouter()
    const { ingredientForm, setIngredientForm } = useGlobalContext()
    const { name, qty, unit } = ingredientForm
    const { data: session } = useSession();

    const items = [
        { label: "My Kitchen", url: "/my-kitchen" },
        { label: name ? name : "Create New", className: "text-success" }
    ]

    const ingredientsUnit = [
        "Batang",
        "Ulas",
        "Buah",
        "Ekor"
    ]

    const [filteredIngredientUnit, setFilteredIngredientUnit] = useState<string[]>([])
    const searchUnit = (event: any) => {
        const { query } = event
        let _filteredIngredientUnit: string[] = []
        _filteredIngredientUnit = ingredientsUnit.filter((name: string) => name.toUpperCase().includes(query.toUpperCase()))
        setFilteredIngredientUnit(_filteredIngredientUnit);
    }

    const handleSubmit = async () => {
        const { id, ...ingredientWithoutId } = ingredientForm

        const response = await fetch(id ? "/api/ingredient/update" : "/api/ingredient/create", {
            method: id ? "PUT" : "POST",
            body: JSON.stringify(id ? ingredientForm : ingredientWithoutId)
        })

        if (response.ok) {
            toast.success(`Ingredient ${name} is ${id ? 'updated' : 'created'}`)
            setIngredientForm(initIngredient)
            router.back()
        } else {
            toast.error("Unexpected error")
        }

    }

    if (session && session.user) {
        return (<div>
            <PtBreadcrumb items={items} />
            <div className="lg:max-w-[90rem] md:max-w-[87.5rem] max-w-[85rem] h-full mx-auto lg:px-[3.75rem] md:px-10 px-5">
                <div className="mt-10 mb-8 text-gray-900 font-medium text-2xl">{name ? name : "Create New Ingredient"}</div>
                <div className="mb-4">
                    <div className="text-gray-900 text-sm font-normal mb-2">Name*</div>
                    <InputText
                        value={name}
                        onChange={(e) => setIngredientForm({
                            ...ingredientForm,
                            name: e.target.value
                        })}
                        placeholder="Insert ingredient name"
                        pt={{
                            root: {
                                className: "shadow-none outline-none rounded-md h-12 px-3 w-full border border-gray-100 placeholder:text-gray-400"
                            }
                        }}
                    />
                </div>
                <div className="flex md:flex-row flex-col gap-4">
                    <div className="grow">
                        <div className="text-gray-900 text-sm font-normal mb-2">Quantity*</div>
                        <InputNumber
                            value={qty}
                            onValueChange={(e) => setIngredientForm({
                                ...ingredientForm,
                                qty: +(e.value || 0)
                            })}
                            placeholder="Insert quantity"
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
                    <div className="grow">
                        <div className="text-gray-900 text-sm font-normal mb-2">Unit*</div>
                        <AutoComplete
                            value={unit}
                            onChange={(e) => setIngredientForm({
                                ...ingredientForm,
                                unit: e.value
                            })}
                            suggestions={filteredIngredientUnit}
                            completeMethod={searchUnit}
                            forceSelection
                            placeholder="Insert unit"
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
                </div>
                <div className="flex justify-end mt-8 gap-3">
                    <Button type="button" label="Back" className="text-gray-900 rounded-full bg-gray-50 px-8 py-[0.875rem] focus:shadow-none" onClick={() => router.back()} />
                    <Button type="button" label="Submit" disabled={!name || !qty || !unit} className="text-white rounded-full bg-success px-8 py-[0.875rem] focus:shadow-none" onClick={handleSubmit} />
                </div>
            </div>
        </div>)
    } else {
        return <Account />
    }
}
