/** @format */

import { config } from "@/config/config";
import { useAppSelector } from "@/store/hooks";
import { loadStripe } from "@stripe/stripe-js";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { IoLogoUsd } from "react-icons/io";
import { TbTruckDelivery } from "react-icons/tb";

const PaymentForm = () => {
  const { productData, userinfoData } = useAppSelector(
    (store) => store.amazon_clone,
  );
  const [totalAmount, setTotalAmount] = useState(0);
  const { data: session } = useSession();

  useEffect(() => {
    let amt = 0;
    productData.map((item) => {
      amt += item.price * item.quantity;
      return;
    });
    setTotalAmount(Math.fround(amt));
  }, [productData]);
  //alert-payment
  const handleAlert = () => {
    alert("Please Login First");
  };

  //stripe-payment
  const stripePromise = loadStripe(config.nextPublicStripePublishableKey!);
  const handleCheckOut = async () => {
    const stripe = await stripePromise;
    const res = await fetch(`${config.apiBaseUrl}checkout`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ items: productData, email: session?.user?.email }),
    });
    const { id } = await res.json();

    //redirecting-user/customer to stripe checkout
    const result: any = await stripe?.redirectToCheckout({
      sessionId: id,
    });
    if (result.error) {
      alert(result.error.message);
    }
  };

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex gap-4'>
        <span className='font-semibold text-2xl mt-1'>
          <TbTruckDelivery />
        </span>
        <p className='font-bodyFont text-amazon_blue'>
          Your order qualifies for FREE Shipping by Choosing this option at
          checkout. See details....
        </p>
      </div>
      <p className='font-bodyFont font-semibold text-lg flex items-center justify-between gap-3'>
        Total:
        <span className='flex items-center text-lg'>
          <IoLogoUsd />
          {totalAmount.toFixed(2)}
        </span>
      </p>
      <div className='flex flex-col gap-2 items-center justify-center'>
        <button
          onClick={session ? handleCheckOut : handleAlert}
          className={`shadow-lg w-1/2 max-lg:w-2/3 h-10 text-sm font-semibold rounded-md ${
            userinfoData
              ? "bg-amazon_button text-amazon_blue cursor-pointer hover:scale-95 transition-transform duration-200"
              : "bg-amazon_blue bg-opacity-55 text-white cursor-not-allowed"
          }`}>
          Procceed to checkout
        </button>
        <button
          onClick={() => signIn()}
          className={`text-center text-sm mt-2 text-red-600 font-semibold animate-bounce cursor-pointer ${
            userinfoData ? "hidden" : "flex"
          }`}>
          Please login to continue
        </button>
      </div>
    </div>
  );
};

export default PaymentForm;
