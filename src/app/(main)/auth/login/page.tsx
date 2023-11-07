"use client"
import { PtBreadcrumb } from "@/components/ptBreadcrumb";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from 'next/navigation';
import { Login } from "./login";

export default function Auth() {
    const { data: session } = useSession();
    const items = [
        { label: "Login", className: "text-success" }
    ]
    const pathname = usePathname();
    const router = useRouter()

    if (session && session.user) {
        router.push("/account")
    }

    return (<div>
        <PtBreadcrumb items={items} />
        <div className="lg:max-w-[90rem] md:max-w-[87.5rem] max-w-[85rem] h-full mx-auto lg:px-[3.75rem] md:px-10 px-5 py-20">
            <Login />
        </div>
    </div>)
}