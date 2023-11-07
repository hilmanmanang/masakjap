"use client"
import { useSession } from "next-auth/react";
import Auth from "../../auth/login/page";

export default function MyRecipes() {
    const { data: session } = useSession();

    if (!session) {
        return <Auth />
    }

    return (<>
        <div className="px-6 py-4 text-gray-900 font-medium text-xl border-b border-b-gray-100">My Recipes</div>
    </>)
}
