import { PtBreadcrumb } from "@/components/ptBreadcrumb";

export default function MyFridge() {
    const items = [{ label: 'My Fridge', url: '/my-fridge', className: 'text-success' }]

    return (<div>
        <PtBreadcrumb items={items} />
        <div className="lg:max-w-[90rem] md:max-w-[87.5rem] max-w-[85rem] h-full mx-auto lg:px-[3.75rem] md:px-10 px-5">
            <div className="mt-10 mb-8 text-gray-900 font-semibold text-[2rem] text-center">My Fridge</div>
        </div>
    </div>)
}