"use client"
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { useEffect, useRef, useState } from "react";

export const Header = () => {
    const pathname = usePathname();
    const { data: session } = useSession();
    const menuRight = useRef<any>(null);
    const router = useRouter()
    const [role, setRole] = useState<string>("User")

    useEffect(() => {
        if (session && session.user) {
            const { user }: any = session
            setRole(user.role)
        }
    }, [session])

    const items: MenuItem[] = [
        {
            template: (item: any, options: any) => {
                return (<div className="flex items-center gap-3 py-3 px-4 border-b border-b-gray-200">
                    <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" shape="circle" className="shrink-0" />
                    <div>
                        <div className="font-bold">Hilman</div>
                        <div>{role}</div>
                    </div>
                </div>)
            }
        },
        {
            label: 'Account',
            icon: 'pi pi-user',
            command: () => router.push("/account")
        },
        {
            label: "Logout",
            icon: "pi pi-sign-out",
            command: () => signOut()
        }
    ]

    return (<div className="fixed w-full z-10">
        <div className="h-[4.875rem] bg-white">
            <div className="lg:max-w-[90rem] md:max-w-[87.5rem] max-w-[85rem] h-full mx-auto lg:px-[3.75rem] md:px-10 px-5">
                <div className="flex items-center h-full justify-between">
                    <div>
                        <Link href="/" className="font-medium text-[2rem] text-green-900">
                            🥗 Masakjap
                        </Link>
                    </div>
                    <div className="font-normal text-lg text-green-900 cursor-pointer">
                        {session && session.user ?
                            (<>
                                <Button
                                    type="button"
                                    icon="pi pi-user"
                                    className="text-gray-900 rounded-full w-16 h-16 focus:shadow-none text-2xl"
                                    onClick={(e) => menuRight?.current.toggle(e)}
                                    pt={{
                                        icon: {
                                            className: "text-xl"
                                        }
                                    }}
                                />
                                <Menu model={items} popup ref={menuRight} id="popup_menu_right" popupAlignment="right" />
                            </>
                            ) :
                            <Link href="/auth/login" >
                                Login
                            </Link>
                        }
                    </div>
                </div>
            </div>
        </div>
        <div className="h-[3.75rem] bg-gray-900 ">
            <div className="lg:max-w-[90rem] md:max-w-[87.5rem] max-w-[85rem] h-full mx-auto lg:px-[3.75rem] md:px-10 px-5">
                <div className="flex items-center h-full gap-9">
                    <Link href="/" className={`${pathname === '/' ? 'text-white' : 'text-gray-400'} font-medium text-sm`}>
                        Home
                    </Link>
                    <Link href="/recipes" className={`${pathname === '/recipes' ? 'text-white' : 'text-gray-400'} font-medium text-sm`}>
                        Recipes
                    </Link>
                    {session && session.user && <Link href="/my-kitchen" className={`${pathname === '/my-kitchen' ? 'text-white' : 'text-gray-400'} font-medium text-sm`}>
                        My Kitchen
                    </Link>}
                </div>
            </div>
        </div>
    </div>)
}
