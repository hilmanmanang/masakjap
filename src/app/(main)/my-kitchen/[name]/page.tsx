"use client"
import { PtBreadcrumb } from "@/components/ptBreadcrumb";
import { useGlobalContext } from "@/providers/context/globalContext";
import { ingredientData, initIngredient } from "@/utils/constant";
import { generateKeyName } from "@/utils/utils";
import moment from 'moment';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AutoComplete } from "primereact/autocomplete";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { useState } from "react";
import { toast } from "react-toastify";
import Account from "../../auth/login/page";
import Auth from "../../auth/login/page";

export default function Name() {
    const router = useRouter()
    const { ingredientForm, setIngredientForm } = useGlobalContext()
    const { name, expiredDate } = ingredientForm
    const { data: session } = useSession();

    const items = [
        { label: "My Kitchen", url: "/my-kitchen" },
        { label: name ? name : "Create New", className: "text-success" }
    ]

    const [filteredIngredientList, setFilteredIngredientList] = useState<string[]>([])
    const searchIngredientList = (event: any) => {
        const { query } = event
        let filteredIngredientList: string[] = []
        for (let data of ingredientData) {
            if (data?.toUpperCase().includes(query.toUpperCase())) {
                filteredIngredientList.push(data)
            }
        }
        setFilteredIngredientList(filteredIngredientList);
    }

    const handleSubmit = async () => {
        const { id, expiredDate, name } = ingredientForm

        const response = await fetch(id ? "/api/ingredient/update" : "/api/ingredient/create", {
            method: id ? "PUT" : "POST",
            body: JSON.stringify(id ? {
                id,
                name,
                keyname: generateKeyName(name),
                expiredDate
            } : {
                name,
                keyname: generateKeyName(name),
                expiredDate
            })
        })

        if (response.ok) {
            toast.success(`Ingredient ${name} is ${id ? 'updated' : 'created'}`)
            setIngredientForm(initIngredient)
            router.back()
        } else {
            toast.error(`Name is ${name} already exist`)
        }

    }

    if (session && session.user) {
        return (<div>
            <PtBreadcrumb items={items} />
            <div className="lg:max-w-[90rem] md:max-w-[87.5rem] max-w-[85rem] h-full mx-auto lg:px-[3.75rem] md:px-10 px-5">
                <div className="mt-10 mb-8 text-gray-900 font-medium text-2xl">{name ? name : "Create New Ingredient"}</div>
                <div className="flex md:flex-row flex-col gap-4">
                    <div className="w-full">
                        <div className="text-gray-900 text-sm font-normal mb-2">Name*</div>
                        <AutoComplete
                            value={name}
                            onChange={(e) => setIngredientForm({
                                ...ingredientForm,
                                name: e.value
                            })}
                            suggestions={filteredIngredientList}
                            completeMethod={searchIngredientList}
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
                    <div className="w-full">
                        <div className="text-gray-900 text-sm font-normal mb-2">Expired Date</div>
                        <Calendar
                            dateFormat="dd M yy"
                            value={expiredDate ? new Date(expiredDate) : undefined}
                            placeholder="Insert expired date"
                            onChange={(e) => setIngredientForm({
                                ...ingredientForm,
                                expiredDate: moment(e.target.value).format('DD MMM YYYY')
                            })}
                            pt={{
                                root: {
                                    className: 'shadow-none outline-none h-12 px-3 w-full border border-gray-100'
                                },
                                input: {
                                    root: {
                                        className: 'shadow-none'
                                    }
                                },
                            }} />
                    </div>
                </div>
                <div className="flex justify-end mt-8 gap-3">
                    <Button type="button" label="Back" className="text-gray-900 rounded-full bg-gray-50 px-8 py-[0.875rem] focus:shadow-none" onClick={() => router.back()} />
                    <Button type="button" label="Submit" disabled={!name} className="text-white rounded-full bg-success px-8 py-[0.875rem] focus:shadow-none" onClick={handleSubmit} />
                </div>
            </div>
        </div>)
    } else {
        return <Auth />
    }
}
