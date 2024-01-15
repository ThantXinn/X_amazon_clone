import FavouriteCard from "@/components/Favourite";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { resetFavourite } from "@/store/slices/appSlice";
import Link from "next/link";

const Favourite = () => {
    const { favouriteData } = useAppSelector((store) => store.amazon_clone)
    const dispatch = useAppDispatch();
    return (
        <div className="flex flex-col items-center min-h-screen w-full bg-white gap-2 p-5">
            <div className="mb-3">
                <h1 className="text-lg font-bold">Favourite Lists</h1>
            </div>
            {favouriteData.length > 0
                ? (
                    <>
                        <div className="w-full border py-4 px-2 rounded-md flex flex-col gap-2 items-center">
                        {
                            favouriteData.map((item) => (
                                <div key={item.id} className="flex w-full">
                                    <FavouriteCard item={item} />
                                </div>
                            ))
                            }
                            <div className="h-10 w-[220px] rounded-full flex items-center justify-center">
                                <button onClick={()=>dispatch(resetFavourite())} className="h-10 w-full text-white bg-amazon_blue rounded-full shadow-lg hover:scale-95 transition-transform duration-300">Reset Favourite List</button>
                            </div>
                        </div>
                    </>
                )
                : (
                    <>
                        <div className="flex flex-col gap-2 py-3">
                            <h1>There is no Favourite Item Lists.</h1>
                            <Link href={"/"}>
                                <button className="w-full p-2 rounded-lg text-white bg-amazon_blue hover:bg-amazon_search hover:text-black duration-300">Go back to Shopping</button>
                            </Link>
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default Favourite;