import Image from "next/image"
import amazon_logo from "../assets/images/amazon_logo.png"
const Footer = () => {
  return (
      <div className="bg-amazon_light w-full h-20 text-gray-300 flex items-center justify-center gap-4">
          <Image className="w-24" src={amazon_logo} alt="amazon_logo" />
          <p className="text-sm -mt-4">All rights reserved <a className="hover:text-white hover:underline decoration-[1px] duration-300" href="#" target="_blank">@amazon_clone.com</a></p>
    </div>
  )
}

export default Footer