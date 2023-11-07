import Image from "next/image"
import { Rating } from "primereact/rating"

export const RecipeCard = () => {
    return (<div className="rounded-lg border border-gray-100 w-full hover:shadow-card cursor-pointer hover:border-success_dark">
        <div className="w-full aspect-square relative">
            <Image
                src="/placeholder.png"
                alt="placeholder"
                fill={true}
                className="rounded-t-lg"
            />
        </div>
        <div className="p-4">
            <div className="text-gray-700 font-normal">Nasi Goreng Ayam</div>
            <div className="text-gray-900 font-medium text-sm mb-2">Hilman Ahmad</div>
            <Rating value={3} cancel={false} pt={{
                root: {
                    className: 'gap-1'
                },
                onIcon: {
                    className: 'text-warning w-3'
                },
                offIcon: {
                    className: 'text-gray-200 w-3'
                }
            }}/>
        </div>
    </div>)
}
