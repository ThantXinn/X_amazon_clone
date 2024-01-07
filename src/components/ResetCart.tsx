import { useAppDispatch } from "@/store/hooks";
import { resetCart } from "@/store/slices/appSlice";

const ResetCart = () => {
    const dispatch = useAppDispatch();
    const handleResetCart = () => {
        const confirmReset = window.confirm(
            "Are you sure to reset your items from the Cart?"
        );
        if (confirmReset) {
            dispatch(resetCart())
        }
    }
  return (
      <button
          onClick={handleResetCart}
          className="w-1/6 max-lg:w-1/2 h-8 shadow-lg bg-amazon_button text-amazon_blue rounded font-bodyFont hover:bg-red-700 duration-200 hover:text-white mt-2">
          Reset Cart
      </button>
  )
}

export default ResetCart