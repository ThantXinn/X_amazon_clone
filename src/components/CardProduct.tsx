import { useAppDispatch } from "@/store/hooks";
import { decreaseQuantity, deleteProduct, increaseQuantity } from "@/store/slices/appSlice";
import { UpdateProductsQty } from "@/types";
import Image from "next/image";
import { FaMinus, FaPlus } from "react-icons/fa";
import { IoLogoUsd } from "react-icons/io";
import { IoClose } from "react-icons/io5";

interface Props{
    item:UpdateProductsQty
}
const CardProduct = ({ item }: Props) => {
    const dispatch = useAppDispatch();
  return (
      <div className="rounded flex max-lg:flex-col items-center gap-4 bg-white px-4 relative font-bodyFont">
          <Image src={item.image} alt="product_image" width={130} height={130} className="object-cover max-sm:mt-3" />
          <div className="flex flex-col gap-2 py-4">
                <div className="flex flex-col gap-2 px-4 w-4/5 max-lg:w-full">
                    <p className="text-lg font-semibold text-amazon_blue">{ item.title}</p>
                    <p className="text-sm text-gray-500">{ item.category}</p>
                    <p className="text-sm text-gray-500">{ item.description}</p>
                    <p className="flex items-center gap-1 font-medium text-amazon_blue">Unit Price
                        <span className="flex items-center font-semibold"><IoLogoUsd />{item.price}</span>
                    </p>
                    <p className="flex items-center gap-1 text-sm">Rating
                        <span className="font-semibold">{item.rating.rate}</span>
                    </p>
                </div>
                <div className="flex items-center gap-2 max-sm:gap-1 px-2 max-sm:px-1">
                    <div className="flex items-center justify-between gap-2 border border-gray-200 px-4 rounded-full w-28 max-sm:w-24 py-1 shadow-lg shadow-gray-300">
                      <button className="scale-100 hover:scale-75 transition-transform delay-300"
                          onClick={() => dispatch(
                              decreaseQuantity({
                                id:item.id,
                                title:item.title,
                                price:item.price,
                                description:item.description,
                                category:item.category,
                                image:item.image,
                                rating:item.rating,
                                quantity: item.quantity
                            })
                        )}
                      ><FaMinus /></button>
                        <span>{item.quantity}</span>
                      <button className="scale-100 hover:scale-75 transition-transform delay-300"
                          onClick={() => dispatch(
                              increaseQuantity({
                                id:item.id,
                                title:item.title,
                                price:item.price,
                                description:item.description,
                                category:item.category,
                                image:item.image,
                                rating:item.rating,
                                quantity: item.quantity
                            })
                        )}
                      ><FaPlus /></button>
                    </div>  
                    <div className="flex items-center group scale-100 hover:scale-90 hover:text-red-700 transition-transform delay-100 text-gray-400">
                      <button className="w-24 max-[320px]:w-8 h-8 rounded-full border p-1 max-[320px]:p-2 shadow-lg shadow-gray-300 text-lg font-medium flex items-center gap-2"
                          onClick={() => dispatch(
                              deleteProduct({
                                id:item.id,
                          })
                      )}
                      ><IoClose />
                          <span className="text-sm max-[320px]:hidden">Remove</span>
                      </button>
                    </div>
                </div>
          </div>
          <div className="absolute flex text-amazon_blue font-semibold bottom-4 right-4 max-sm:bottom-6 max-sm:text-sm">
              <p className="flex items-center gap-1"><span className="flex items-center font-semibold"><IoLogoUsd /></span>{(item.price * item.quantity).toFixed(2)}</p>
          </div>
    </div>
  )
}

export default CardProduct