"use client"
import { initUser } from '@/utils/constant';
import { User } from '@/utils/interface';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
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
    const [user, setUser] = useState<User>(initUser)

    useEffect(() => {
        if (session?.user) {
            const { user }: any = session
            setUser(user)
        }
    }, [session])

    const items: MenuItem[] = [
        {
            template: (item: any, options: any) => {
                return (<div className="flex items-center gap-3 py-3 px-4 border-b border-b-gray-200">
                    {user.image ?
                        <Avatar image={user.image || ''} shape="circle" className="shrink-0" /> :
                        <div className="w-8 h-8 rounded-full bg-[#20b52633] text-success flex justify-center items-center text-xs font-semibold shrink-0">{user.firstName?.[0]}{user.lastName?.[0]}</div>

                    }
                    <div>
                        <div className="font-bold truncate w-32">{`${user.firstName} ${user.lastName}`}</div>
                        <div>{user.username}</div>
                    </div>
                </div>)
            }
        },
        {
            label: 'Account',
            icon: (options: any) => <PersonOutlineOutlinedIcon {...options.iconProps} />,
            command: () => router.push("/account")
        },
        {
            label: "Logout",
            icon: (options: any) => <LogoutOutlinedIcon {...options.iconProps} />,
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
                                    className="text-gray-900 rounded-full w-16 h-16 focus:shadow-none text-2xl"
                                    onClick={(e) => menuRight?.current.toggle(e)}
                                >
                                    <PersonOutlineOutlinedIcon className="text-3xl" />
                                </Button>
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
