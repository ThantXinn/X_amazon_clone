import { Products } from "@/types";
import Image from "next/image";

interface Props{
    item: Products
}

const SearchProductCard = ({ item}:Props) => {
    return (
        <div className="flex justify-between shadow gap-2 px-3 scale-95 border-b border-slate-200 cursor-pointer group hover:scale-100 hover:bg-slate-100 delay-200 transition-transform">
            <div className="flex w-full items-center text-xs">
                <p>{item.title}</p>
            </div>
            <div className="flex p-2">
                <Image src={item.image} alt="Product Image" width={32} height={32} objectFit="cover" objectPosition="center"/>
            </div>
        </div>
    )
}

export default SearchProductCard;