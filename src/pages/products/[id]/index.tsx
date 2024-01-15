import { useAppDispatch } from "@/store/hooks";
import { addtoCart, addtoFavourite } from "@/store/slices/appSlice";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { GrLocation } from "react-icons/gr";

const DynamicProductPage = () => {
    const [productDetail, setProductDetail] = useState<any>({});
    const [selectedValue, setSelectedValue] = useState("1");
    const router = useRouter();
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        setProductDetail(router.query)
    }, [router.query])
    
    const date_format = (seconds:number) => {
        const now = new Date();
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const hour = Math.floor(seconds / 3600)
        const min = Math.floor((60 - now.getMinutes()))
        const formated_time = `${hour.toString().padStart(2,"0")} hrs ${min.toString().padStart(2,"0")} min`

        const currentDay = daysOfWeek[now.getDay()];
        const currentMonth = monthsOfYear[now.getMonth()];
        const currentDate = now.getDate();

        const formated_datetime = `${currentDay},${currentMonth},${currentDate}`;
        return {formated_datetime,formated_time};
    }

    const product_qarry = Array.from({ length: productDetail.count }, (_, index) => `${index + 1}`);

    return (
        <div className="h-full flex justify-center p-4 gap-4 bg-white font-bodyFont">
            <div className="flex flex-col items-center mt-7 w-2/5">
                <Image src={productDetail.image} alt="product_image" width={240} height={240} objectFit="cover" objectPosition="center" />
            </div>
            <div className="flex flex-col h-fit gap-3 p-3 w-1/3">
                <div className="flex flex-col items-start w-full h-fit py-3 border-b">
                    <p className="text-amazon_blue text-lg font-semibold">{productDetail.title}</p>
                    <span>{ productDetail.rate * 1000 } ratings</span>
                    <span>{productDetail.count}</span>
                </div>
                <div className="flex flex-col gap-3 border-b">
                    <p className="text-lg text-red-600"><span className="text-black text-sm">Last Price:</span> $ { productDetail.price}</p>
                    <p>Available at a lower price from other sellers that may not offer free Prime shipping.</p>
                    <div className="capitalize text-amazon_blue grid grid-cols-2 w-3/4 py-3">
                        <p className="text-amazon_blue font-semibold">Category </p>
                        <span>{productDetail.category}</span>
                    </div>
                </div>
                <div className="py-3 grid gap-2">
                    <p className="font-bodyFont text-lg text-amazon_blue font-semibold">About this item</p>
                    <span>{productDetail.description }</span>
                </div>
            </div>
            <div className="flex flex-col p-4 w-1/4">
                <div className="border rounded-md p-3">
                    <p className="text-lg text-amazon_blue font-semibold p-4">$ {productDetail.price}</p>
                    <p className="text-slate-600 px-4">
                        No Import Charges & $ {productDetail.price} Shipping to Japan
                        <span className="text-blue-400 cursor-pointer"> Details </span>
                        <span className="text-black"> Delivery </span>
                        <span className="text-amazon_blue font-semibold">{date_format((23 * 3600)+(59 * 60)).formated_datetime}.</span> Order within <span className="text-green-700">{date_format((23 * 3600)+(59 * 60) ).formated_time}</span>
                    </p>
                    <div className="flex items-center gap-1 p-4">
                        <GrLocation />
                        <p className="text-sm">Delivery to Japan</p>
                    </div>
                    <p className="p-4 text-green-800 font-semibold">In Stock</p>
                    <div className="flex items-center justify-between gap-2 border border-gray-200 px-4 rounded-full w-full max-sm:w-24 py-1 shadow">
                        <label>Quantity:</label>
                        <select value={selectedValue} onChange={(e)=>setSelectedValue(e.target.value)} className="flex w-full">
                            {
                                product_qarry.map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="w-full flex justify-between py-4">
                        <button className="h-8 w-[75%] bg-amazon_yellow text-black rounded-full hover:scale-95 transition-transform duration-300"
                            onClick={() => dispatch(addtoCart({
                                id:Number(productDetail.id),
                                title: productDetail.title,
                                price: Number(productDetail.price),
                                description:productDetail.description,
                                category: productDetail.category,
                                image: productDetail.image,
                                rating:{rate: Number(productDetail.rate),count:Number(productDetail.count)},
                                quantity: Number(selectedValue)
                            }))}>Add To Cart
                        </button>
                        <button className="h-8 w-[25%] text-2xl max-xl:text-lg rounded hover:scale-90 transition-transform duration-300 flex justify-center items-center"
                            onClick={() => dispatch(addtoFavourite({
                                id:Number(productDetail.id),
                                title: productDetail.title,
                                price: Number(productDetail.price),
                                description:productDetail.description,
                                category: productDetail.category,
                                image: productDetail.image,
                                rating:{rate: Number(productDetail.rate),count:Number(productDetail.count)},
                                quantity: Number(selectedValue)
                            }))} ><FaHeart />
                        </button>
                    </div> 
                    <div className="grid grid-cols-2 w-full text-sm gap-1">
                        <p>Ships from</p>
                        <span>Amazon Clone.com</span>
                        <p>Sold by</p>
                        <span>Amazon Clone.com</span>
                        <p>Returns</p>
                        <span className="cursor-pointer text-cyan-700 hover:text-red-600">Eligible for Return, Refund or Replacement within 30 days of receipt.....</span>
                        <p>Payment</p>
                        <span className="cursor-pointer text-cyan-700 hover:text-red-600">Secure transaction</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DynamicProductPage;