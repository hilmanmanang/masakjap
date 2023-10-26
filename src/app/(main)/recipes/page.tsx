import { PtBreadcrumb } from "@/components/ptBreadcrumb";
import Image from "next/image";
import { RecipeCard } from "./recipeCard";

export default function MyFridge() {
    const items = [{ label: 'Recipes', url: '/recipes', className: 'text-success' }]

    return (<div>
        <PtBreadcrumb items={items} />
        <div className="lg:max-w-[90rem] md:max-w-[87.5rem] max-w-[85rem] h-full mx-auto lg:px-[3.75rem] md:px-10 px-5">
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-8">
                <RecipeCard />
                <RecipeCard />
                <RecipeCard />
                <RecipeCard />
            </div>
        </div>
    </div>)
}