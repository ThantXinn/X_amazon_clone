import CardProduct from "@/components/CardProduct"
import PaymentForm from "@/components/PaymentForm"
import ResetCart from "@/components/ResetCart"
import { useAppSelector } from "@/store/hooks"
import Link from "next/link"

const CartPage = () => {
  const { productData } = useAppSelector((state) => state.amazon_clone)
  
  return (
    <div className="max-w-screen-2xl min-h-screen mx-auto px-10 grid grid-cols-5 gap-5 py-4">
      {productData.length > 0 ?
        (
          <>
            <div className="bg-gray-100 p-3 rounded col-span-3 max-sm:col-span-6">
              <div className="flex items-center justify-between border-b-[1px] border-b-gray-300 pb-1 ">
                <p className="text-2xl font-semibold text-amazon_blue">Shopping Cart</p>
                <p className="text-lg font-semibold text-amazon_blue">Sub-total</p>
              </div>
              <div>
                {
                  productData.map((item) => (
                    <div key={item.id} className="pt-2 flex gap-2 flex-col capitalize">
                      <CardProduct item={item} />
                    </div>
                  ))
                }
                <ResetCart/>
              </div>
            </div>
            <div className="bg-white h-64 col-span-2 max-sm:col-span-6 p-4 rounded-md flex items-center">
              <PaymentForm />
            </div>
          </>
        )
        :
        (<div className="font-bodyFont flex items-center flex-col col-span-5 justify-center bg-white rounded w-full h-full gap-4 p-4">
          <h1 className="text-amazon_blue font-semibold text-xl">Your Cart is Empty.</h1>
          <Link href={"/"}>
            <button className="w-full p-2 rounded-lg text-white bg-amazon_blue hover:bg-amazon_search hover:text-black duration-300">Go back to Shopping</button>
          </Link>
        </div>)
      }
    </div>
  )
}

export default CartPage