import { useAppDispatch } from "@/store/hooks";
import { addtoCart, addtoFavourite } from "@/store/slices/appSlice";
import { Products } from "@/types";
import Image from "next/image";
import { FaHeart, FaStar } from "react-icons/fa";
import { IoLogoUsd } from "react-icons/io";

const Product = ({ productData }: any) => {
    const dispatch = useAppDispatch();

    return (
        <div className="w-full">
            <div className="w-full h-10 mb-5">
                <div className="bg-slate-50 h-full flex items-center justify-center mx-6 max-lg:hidden">
                    <p className="text-sm max-xl:text-xs">You are on amazon_clone.com. You can also shop on Amazon_Clone Japan for millions of products with fast local delivery. <a href="#" target="_blank" className="text-green-900 cursor-pointer hover:text-red-700 
                    hover:underline">Click here to go to amazon_clone.co.jp</a></p>
                </div>
            </div>
            <div className="w-full px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {
                productData.map(({id,title,price,description,category,image,rating}:Products) => (
                    <div key={id} className="flex flex-col justify-center bg-white relative w-full text-black p-4 border rounded-sm group overflow-hidden cursor-pointer">
                        <div className="w-full h-[260px] max-lg:h-[180px] relative">
                            <div className="flex items-center gap-2 animate-pulse">
                                <FaStar/><h4 className="font-bold">{rating.rate}</h4>
                            </div>
                            <Image width={120} height={120} src={image} alt="product_image" className="w-full h-full object-scale-down max-sm:scale-[90%] scale-[80%] hover:scale-[90%] max-sm:hover:scale-[100%] transition-transform duration-300"/>
                        </div>
                        <hr className="mt-8"/>
                        <div className="relative h-[220px] flex flex-col gap-1 p-2">
                            <p className="py-1 flex items-center gap-2 font-bold max-lg:text-sm">
                                <span className="flex items-center gap-1 text-sm"><IoLogoUsd />{price}</span>
                            </p>
                            <div className="flex h-[60%] overflow-hidden">
                                <p className="py-1 max-lg:text-xs text-gray-500 capitalize">{description.substring(0, 120)}
                                </p>
                            </div>
                            <div className="w-full flex justify-between bottom-4 absolute">
                                <button className="h-10 w-[75%] bg-black text-white rounded hover:scale-95 transition-transform duration-300"
                                    onClick={() => dispatch(addtoCart({
                                        id,
                                        title,
                                        price,
                                        description,
                                        category,
                                        image,
                                        rating,
                                        quantity: 1
                                }))}>Add To Cart</button>
                                <button className="h-10 w-[25%] text-2xl max-xl:text-lg rounded hover:scale-90 transition-transform duration-300 flex justify-center items-center"
                                    onClick={() => dispatch(addtoFavourite({
                                        id,
                                        title,
                                        price,
                                        description,
                                        category,
                                        image,
                                        rating,
                                        quantity: 1
                                }))} ><FaHeart/></button>
                            </div>    
                        </div>
                    </div>
                ))
            }
            </div>
        </div>)
}

export default Product