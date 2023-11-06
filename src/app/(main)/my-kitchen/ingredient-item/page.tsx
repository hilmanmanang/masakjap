"use client"
import { PtBreadcrumb } from "@/components/ptBreadcrumb";
import { useGlobalContext } from "@/providers/context/globalContext";
import { initIngredientList } from "@/utils/constant";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { toast } from "react-toastify";

export default function IngredientItem() {
    const router = useRouter()

    const items = [
        { label: "Ingredient Item", className: "text-success" },
    ]

    const { ingredientListForm, setIngredientListForm } = useGlobalContext()
    const { myname, enname } = ingredientListForm

    const handleSubmit = async () => {
        const { id, enname, myname } = ingredientListForm

        const response = await fetch(id ? "/api/ingredientList/update" : "/api/ingredientList/create", {
            method: id ? "PUT" : "POST",
            body: JSON.stringify(id ? {
                id,
                enname,
                myname,
                keyname: generateKeyName(enname)
            } : {
                enname,
                myname,
                keyname: generateKeyName(enname)
            })
        })

        if (response.ok) {
            toast.success(`Ingredient List ${enname} is ${id ? 'updated' : 'created'}`)
            setIngredientListForm(initIngredientList)
        } else {
            toast.error("Unexpected error")
        }

    }

    const generateKeyName = (name: string): string => {
        return name.toLowerCase().trim()
    }

    return (<div>
        <PtBreadcrumb items={items} />
        <div className="lg:max-w-[90rem] md:max-w-[87.5rem] max-w-[85rem] h-full mx-auto lg:px-[3.75rem] md:px-10 px-5">
            <div className="mt-10 mb-8 text-gray-900 font-medium text-2xl">Create New Ingredient Item</div>
            <div className="flex md:flex-row flex-col gap-4">
                <div className="grow">
                    <div className="text-gray-900 text-sm font-normal mb-2">Name (Malay)*</div>
                    <InputText
                        value={myname}
                        onChange={(e) => setIngredientListForm({
                            ...ingredientListForm,
                            myname: e.target.value
                        })}
                        placeholder="Insert name in Malay"
                        pt={{
                            root: {
                                className: "shadow-none outline-none rounded-md h-12 px-3 w-full border border-gray-100 placeholder:text-gray-400"
                            }
                        }}
                    />
                </div>
                <div className="grow">
                    <div className="text-gray-900 text-sm font-normal mb-2">Name (English)*</div>
                    <InputText
                        value={enname}
                        onChange={(e) => setIngredientListForm({
                            ...ingredientListForm,
                            enname: e.target.value
                        })}
                        placeholder="Insert name in English"
                        pt={{
                            root: {
                                className: "shadow-none outline-none rounded-md h-12 px-3 w-full border border-gray-100 placeholder:text-gray-400"
                            }
                        }}
                    />
                </div>
            </div>
            <div className="flex justify-end mt-8 gap-3">
                <Button type="button" label="Back" className="text-gray-900 rounded-full bg-gray-50 px-8 py-[0.875rem] focus:shadow-none" onClick={() => router.back()} />
                <Button type="button" label="Submit" disabled={!enname || !myname} className="text-white rounded-full bg-success px-8 py-[0.875rem] focus:shadow-none" onClick={handleSubmit} />
            </div>
        </div>
    </div>)
}
