import { useAppDispatch } from "@/store/hooks";
import { addtoCart, deleteFavouriteProduct } from "@/store/slices/appSlice";
import { UpdateProductsQty } from "@/types";
import Image from "next/image";
import { IoClose } from "react-icons/io5";

interface Porps{
    item: UpdateProductsQty
}
const FavouriteCard = ({ item }: Porps) => {
    
    const dispatch = useAppDispatch();
    
    return (
        <div className="flex w-full">
            <div className="w-1/4 max-lg:hidden"></div>
            <div className="w-3/4 max-lg:w-full max-lg:flex-col flex border-b border-slate-600">
                <div className="flex max-sm:flex-col max-sm:items-center max-sm:justify-center p-4 w-full">
                    <div className="object-cover object-top">
                        <Image src={item.image} alt="favorite_image" width={120} height={120}/>
                    </div>
                    <div className="flex flex-col items-center justify-center w-3/4 max-sm:w-full px-4">
                        <p className="text-center text-lg font-semibold">{item.title}</p>
                        <p className="font-bold">Unit Price: $ {item.price}</p>
                        <p className="text-center p-2 font-semibold text-cyan-800">{item.description}</p>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center px-2 w-full">
                    <div className="flex items-center justify-center w-[220px]">
                        <button className="h-10 w-full text-black bg-amazon_yellow rounded-full shadow-lg hover:scale-95 transition-transform duration-300"
                            onClick={() => dispatch(addtoCart({
                                id: item.id,
                                title: item.title,
                                price: item.price,
                                description:item.description,
                                category:item.category,
                                image: item.image,
                                rating: item.rating,
                                quantity: 1
                            }))}>Add To Cart
                        </button>
                    </div>
                    <div className="flex justify-center w-full items-center py-5 gap-2 max-sm:gap-1 px-2 max-sm:px-1">  
                        <div className="flex w-[220px] justify-center items-center group hover:scale-95 hover:text-red-700 transition-transform delay-100 text-gray-400">
                        <button className="w-full h-10 max-[320px]:w-8 rounded-full border p-1 max-[320px]:p-2 shadow-lg shadow-gray-300 text-lg font-medium flex items-center justify-center gap-2"
                            onClick={() => dispatch(
                                deleteFavouriteProduct({
                                    id:item.id,
                            })
                        )}
                        ><IoClose />
                            <span className="text-center text-sm max-[320px]:hidden">Remove</span>
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FavouriteCard;