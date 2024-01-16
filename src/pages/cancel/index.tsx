import Link from "next/link";

const CancelPage = () => {
    return (
        <div className="flex flex-col gap-2 items-center justify-center py-10 min-h-screen">
          <h1 className="text-xl font-semibold">Sorry your payment was cancel.</h1>
          <Link href={"/"} className="text-lg text-gray-500 hover:underline underline-offset-4 decoration-[1px] hover:text-amazon_light duration-300">
              <p>Go back to shopping</p>
          </Link>
    </div>
    )
}

export default CancelPage;