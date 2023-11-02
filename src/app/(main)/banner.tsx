import { ScrollReveal } from '@/components/scrollReveal'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from 'primereact/button'

export const Banner = () => {
    return (
        <div className="bg-green-50 h-[40rem] relative">
            <div className="lg:max-w-[90rem] md:max-w-[87.5rem] max-w-[85rem] h-full mx-auto lg:px-[3.75rem] md:px-10 px-5 flex items-center gap-20">
                <div className="relative h-[30rem] w-[30rem] lg:block hidden">
                    <Image
                        src="/banner food hilman ahmad tornadobyte.png"
                        alt="banner food hilman ahmad tornadobyte"
                        fill={true}
                        className="object-contain"
                    />
                </div>
                <div>
                    <ScrollReveal>
                        <div className="text-sm font-medium text-success mb-4">WELCOME TO MASAKJAP</div>
                    </ScrollReveal>
                    <ScrollReveal delay="0.15s">
                        <div className="max-w-[40rem] text-gray-900 font-semibold text-6xl mb-4 leading-tight">Generate Recipes from Your Kitchen </div>
                    </ScrollReveal>
                    <ScrollReveal delay="0.45s">
                        <div className="text-gray-500 text-sm font-normal mb-8">You have a lot ingredients in your kitchen but don&apos;t know what to cook?</div>
                    </ScrollReveal>
                    <ScrollReveal delay="0.6s">
                        <Link href="/recipes">
                            <Button label="Cook now" iconPos="right" icon="pi pi-arrow-right" pt={{
                                root: {
                                    className: "text-white bg-success py-4 px-10 rounded-full shadow-none"
                                }
                            }} />
                        </Link>
                    </ScrollReveal>
                </div>
            </div>
        </div>
    )
}
