"use client"
import Link from "next/link"
import { usePathname } from 'next/navigation'

export const Header = () => {
    const pathname = usePathname();
    return (<div className="fixed w-full z-10">
        <div className="h-[4.875rem] bg-white">
            <div className="lg:max-w-[90rem] md:max-w-[87.5rem] max-w-[85rem] h-full mx-auto lg:px-[3.75rem] md:px-10 px-5">
                <div className="flex items-center h-full justify-between">
                    <div>
                        <Link href="/" className="font-medium text-[2rem] text-green-900">
                            🥗 Masakjap
                        </Link>
                    </div>
                    <div>
                        <Link href="/account" className="font-normal text-lg text-green-900">
                            Login
                        </Link>
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
                    <Link href="/my-kitchen" className={`${pathname === '/my-kitchen' ? 'text-white' : 'text-gray-400'} font-medium text-sm`}>
                        My Kitchen
                    </Link>
                </div>
            </div>
        </div>
    </div>)
}
