import { useAppDispatch } from "@/store/hooks";
import { resetCart } from "@/store/slices/appSlice";
import Link from "next/link";

const SuccessPage = () => {
    const dispatch = useAppDispatch();

  return (
      <div className="flex flex-col gap-2 items-center justify-center py-10">
          <h1 className="text-xl font-semibold">Thank you for shopping in amazon_clone.jp</h1>
          <Link href={"/"} onClick={()=>dispatch(resetCart())} className="text-lg text-gray-500 hover:underline underline-offset-4 decoration-[1px] hover:text-amazon_light duration-300">
              <p>Continue to shopping</p>
          </Link>
    </div>
  )
}

export default SuccessPage