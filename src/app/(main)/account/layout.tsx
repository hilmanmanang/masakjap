
"use client"
import { PtBreadcrumb } from "@/components/ptBreadcrumb";
import RiceBowlOutlinedIcon from "@mui/icons-material/RiceBowlOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Account from "./page";
import Link from "next/link";

export default function AccountLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const items = [
        { label: "Account", className: "text-success" }
    ]
    const pathname = usePathname();
    const { data: session } = useSession();

    if (!session) {
        return <Account />
    }

    return (<div>
        <PtBreadcrumb items={items} />
        <div className="lg:max-w-[90rem] md:max-w-[87.5rem] max-w-[85rem] h-full mx-auto lg:px-[3.75rem] md:px-10 px-5 py-20">
            <div className="flex md:flex-row flex-col gap-6">
                <div className="w-[19.5rem] shrink-0 rounded-lg border border-gray-100">
                    <div className="text-gray-900 text-xl font-medium pt-6 pl-5 pb-4">Navigation</div>
                    <Link href="/account">
                        <div className={`flex flex-row gap-[0.625rem] cursor-pointer hover:bg-green-50 items-center py-4 ${pathname === '/account' ? 'bg-green-50 border-l-[0.188rem] border-l-success pl-[1.063rem]' : 'pl-5'}`}>
                            <AccountCircleOutlinedIcon className={`${pathname === '/account' ? 'text-gray-900' : 'text-gray-200'} w-[1.125rem] h-[1.125rem]`} />
                            <span className={`${pathname === '/account' ? 'text-gray-900' : 'text-gray-600'}`}>Account</span>
                        </div>
                    </Link>
                    <Link href="/account/my-recipes">
                        <div className={`flex flex-row gap-[0.625rem] cursor-pointer hover:bg-green-50 items-center py-4 ${pathname === '/account/my-recipes' ? 'bg-green-50 border-l-[0.188rem] border-l-success pl-[1.063rem]' : 'pl-5'}`}>
                            <RiceBowlOutlinedIcon className={`${pathname === '/account/my-recipes' ? 'text-gray-900' : 'text-gray-200'} w-[1.125rem] h-[1.125rem]`} />
                            <span className={`${pathname === '/account/my-recipes' ? 'text-gray-900' : 'text-gray-600'}`}>My Recipes</span>
                        </div>
                    </Link>
                    <Link href="/account/settings">
                        <div className={`flex flex-row gap-[0.625rem] cursor-pointer hover:bg-green-50 items-center py-4 ${pathname === '/account/settings' ? 'bg-green-50 border-l-[0.188rem] border-l-success pl-[1.063rem]' : 'pl-5'}`}>
                            <SettingsOutlinedIcon className={`${pathname === '/account/settings' ? 'text-gray-900' : 'text-gray-200'} w-[1.125rem] h-[1.125rem]`} />
                            <span className={`${pathname === '/account/settings' ? 'text-gray-900' : 'text-gray-600'}`}>Settings</span>
                        </div>
                    </Link>
                </div>
                <div className="rounded-lg border border-gray-100 grow">{children}</div>
            </div>
        </div>
    </div>)
}
