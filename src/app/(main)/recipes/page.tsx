"use client"
import { PtBreadcrumb } from "@/components/ptBreadcrumb";
import { RecipeCard } from "./recipeCard";

export default function Recipes() {
    const items = [{ label: "Recipes", className: "text-success" }]

    return (<div>
        <PtBreadcrumb items={items} />
        <div className="lg:max-w-[90rem] md:max-w-[87.5rem] max-w-[85rem] h-full mx-auto lg:px-[3.75rem] md:px-10 px-5">
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-8">
                <RecipeCard />
                <RecipeCard />
            </div>
        </div>
    </div>)
}