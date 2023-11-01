"use client"
import { PtBreadcrumb } from "@/components/ptBreadcrumb"
import { useGlobalContext } from "@/providers/context/globalContext";
import { AutoComplete } from "primereact/autocomplete"
import { InputNumber } from "primereact/inputnumber";
import { useState } from "react";


export default function Name({ params }: any) {
    const items = [
        { label: "My Fridge", url: "/my-fridge" },
        { label: params.name === "new" ? "Create New" : params.name, className: "text-success" }
    ]

    const { ingredientForm, setIngredientForm } = useGlobalContext()

    const ingredientsName = [
        "Bawang Merah",
        "Bawang Putih"
    ]

    const ingredientsUnit = [
        "Batang",
        "Ulas",
        "Buah",
        "Ekor"
    ]

    const [selectedIngredient, setSelectedIngredient] = useState<string>("")
    const [filteredIngredient, setFilteredIngredient] = useState<string[]>([])
    const search = (event: any) => {
        const { query } = event
        let _filteredIngredient: string[] = []
        _filteredIngredient = ingredientsName.filter((name: string) => name.toUpperCase().includes(query.toUpperCase()))
        console.log(_filteredIngredient)
        setFilteredIngredient(_filteredIngredient);
    }

    const [selectedIngredientUnit, setSelectedIngredientUnit] = useState<string>("")
    const [filteredIngredientUnit, setFilteredIngredientUnit] = useState<string[]>([])
    const searchUnit = (event: any) => {
        const { query } = event
        console.log(query)
        let _filteredIngredientUnit: string[] = []
        _filteredIngredientUnit = ingredientsUnit.filter((name: string) => name.toUpperCase().includes(query.toUpperCase()))
        console.log(_filteredIngredientUnit)
        setFilteredIngredientUnit(_filteredIngredientUnit);
    }

    return (<div>
        <PtBreadcrumb items={items} />
        <div className="lg:max-w-[90rem] md:max-w-[87.5rem] max-w-[85rem] h-full mx-auto lg:px-[3.75rem] md:px-10 px-5">
            <div className="mt-10 mb-8 text-gray-900 font-medium text-2xl">{params.name === "new" ? "Create New" : params.name}</div>
            <div>
                <div className="text-gray-900 text-sm font-normal mb-2">Name*</div>
                <AutoComplete
                    value={selectedIngredient}
                    suggestions={filteredIngredient}
                    completeMethod={search}
                    onChange={(e) => setSelectedIngredient(e.value)}
                    forceSelection
                    placeholder="Insert ingredient name"
                    pt={{
                        root: {
                            className: "w-full mb-4"
                        },
                        input: {
                            root: {
                                className: "shadow-none outline-none rounded-md h-12 px-3 w-full border border-gray-100 mb-4 placeholder:text-gray-400"
                            }
                        }
                    }}
                />
            </div>
            <div className="flex md:flex-row flex-col gap-4">
                <div className="grow">
                    <div className="text-gray-900 text-sm font-normal mb-2">Quantity*</div>
                    <InputNumber
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
                    <div className="text-gray-900 text-sm font-normal mb-2">Name*</div>
                    <AutoComplete
                        value={selectedIngredientUnit}
                        suggestions={filteredIngredientUnit}
                        completeMethod={searchUnit}
                        onChange={(e) => setSelectedIngredientUnit(e.value)}
                        forceSelection
                        placeholder="Insert ingredient name"
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
        </div>
    </div>)
}
