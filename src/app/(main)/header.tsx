"use client"
import Link from "next/link"
import { usePathname } from 'next/navigation'

export const Header = () => {
    const pathname = usePathname();
    return (<div className="fixed w-full z-10">
        <div className="h-[2.625rem] bg-gray-800">
            <div className="lg:max-w-[90rem] md:max-w-[87.5rem] max-w-[85rem] h-full mx-auto lg:px-[3.75rem] md:px-10 px-5 flex justify-between text-gray-300 items-center font-normal text-xs">
                <div>✼ We generate recipes based on what you have!</div>
                <div>EN • Sign In • Sign Up</div>
            </div>
        </div>
        <div className="h-[4.875rem] bg-white">
            <div className="lg:max-w-[90rem] md:max-w-[87.5rem] max-w-[85rem] h-full mx-auto lg:px-[3.75rem] md:px-10 px-5">
                <div className="flex items-center h-full">
                    <Link href="/" className="font-medium text-[2rem] text-green-900 mr-16">
                        🥗 Masakjap
                    </Link>
                    <Link href="/" className={`${pathname === '/' ? 'text-success' : 'text-gray-600'} font-medium text-sm mr-8`}>
                        Home
                    </Link>
                    <Link href="/recipes" className={`${pathname === '/recipes' ? 'text-success' : 'text-gray-600'} font-medium text-sm mr-8`}>
                        Recipes
                    </Link>
                    <Link href="/my-fridge" className={`${pathname === '/my-fridge' ? 'text-success' : 'text-gray-600'} font-medium text-sm mr-8`}>
                        My Fridge
                    </Link>
                </div>
            </div>
        </div>
    </div>)
}
