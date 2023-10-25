import Image from "next/image";
import { Button } from "primereact/button";

export default function Home() {
    return (<>
        <div className="bg-green-50 h-[40rem] relative">
            <div className="lg:max-w-[90rem] md:max-w-[87.5rem] max-w-[85rem] h-full mx-auto lg:px-[3.75rem] md:px-10 px-5 flex items-center gap-11">
                <div className="relative h-full max-w-[46.375rem] grow lg:block hidden">
                    <Image
                        src="/masakjap hilman ahmad tornadobyte.png"
                        alt="masakjap hilman ahmad tornadobyte"
                        fill={true}
                        className="object-contain"
                    />
                </div>
                <div>
                    <div className="text-sm font-medium text-success mb-2">WELCOME TO MASAKJAP</div>
                    <div className="max-w-[37.25rem] text-gray-900 font-semibold text-7xl mb-7">Fresh & Healthy Organic Food</div>
                    <div className="text-[2rem] mb-3">
                        <span className="font-normal text-gray-900">We have a lot of </span>
                        <span className="font-semibold text-warning">RECIPES</span>
                    </div>
                    <div className="text-gray-500 text-sm font-normal mb-8">Cook based on what you have in a fridge, no time to think what to cook.</div>
                    <Button label="Cook now" iconPos="right" icon="pi pi-arrow-right" pt={{
                        root: {
                            className: "text-white bg-success py-4 px-10 rounded-full shadow-none"
                        }
                    }}/>
                </div>
            </div>
        </div>
    </>)
}
