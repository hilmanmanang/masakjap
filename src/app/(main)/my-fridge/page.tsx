"use client"
import { PtBreadcrumb } from "@/components/ptBreadcrumb";
import { Ingredient } from "@/utils/interface";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useRouter } from 'next/navigation'
 
export default function MyFridge() {
    const router = useRouter()
    const items = [{ label: 'My Fridge', url: '/my-fridge', className: 'text-success' }]
    const ingredients: Ingredient[] = [
        {
            id: 1,
            name: "Bawang Merah",
            qty: 5,
            unit: "Ulas"
        },
        {
            id: 2,
            name: "Bawang Putih",
            qty: 15,
            unit: "Ulas"
        },
        {
            id: 3,
            name: "Telur",
            qty: 10,
            unit: "Biji"
        },
        {
            id: 4,
            name: "Ayam",
            qty: 3,
            unit: "Ketul"
        },
        {
            id: 5,
            name: "Kicap",
            qty: 1,
            unit: "Botol"
        }
    ]

    const actionBodyTemplate = (ingredient: Ingredient) => {
        return <Button type="button" label="Change" className="text-white rounded-full bg-success px-8 py-[0.875rem] focus:shadow-none" onClick={() => openIngredient(ingredient)} />
    }

    const openIngredient = (ingredient: Ingredient) => {
        console.log('sss', ingredient)
    }

    const createNewIngredient = () => {
        console.log('new')
        router.push('/my-fridge/new', { scroll: false })
    }

    return (<div>
        <PtBreadcrumb items={items} />
        <div className="lg:max-w-[90rem] md:max-w-[87.5rem] max-w-[85rem] h-full mx-auto lg:px-[3.75rem] md:px-10 px-5">
            <div className="mt-10 mb-8 text-gray-900 font-semibold text-[2rem] text-center">My Fridge</div>
            <div className="flex justify-end mb-8">
                <Button type="button" label="Create New Ingredient" className="text-white rounded-full bg-success px-8 py-[0.875rem] focus:shadow-none" onClick={createNewIngredient} />
            </div>
            <DataTable value={ingredients}>
                <Column field="name" header="NAME" sortable />
                <Column field="qty" header="QUANTITY" sortable align="right" />
                <Column field="unit" header="UNIT" sortable align="right" />
                <Column
                    className="w-52"
                    header="ACTION"
                    body={actionBodyTemplate}
                    align="right">
                </Column>
            </DataTable>
        </div>
    </div>)
}