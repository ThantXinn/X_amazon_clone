import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addUser } from "@/store/slices/appSlice";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { GrLocation, GrSearch } from "react-icons/gr";
import { MdArrowDropDown } from "react-icons/md";
import amazon_logo from "../assets/images/amazon_logo.png";
import cart_icon from "../assets/images/cart_icon.png";
import usflag_icon from "../assets/images/usflag_icon.svg";

const Header = () => {
  const { data: session } = useSession()
  const { productData, favouriteData, userinfoData } = useAppSelector((state) => state.amazon_clone)
  
  //console.log(favouriteData, userinfoData)
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (session) {
      dispatch(addUser({
        name: session.user?.name,
        email: session.user?.email,
        image: session.user?.image
      }))
    }
  },[session])
  return (
      <div className="w-full h-16 bg-amazon_blue text-lightText sticky top-0 z-50 max-lg:h-12">
          <div className="w-full h-full inline-flex mx-auto justify-between items-center gap-1 md:gap-2 px-2 max-lg:px-1">
              {/*amazon_logo*/}
              <Link href={"/"} className="px-1 border border-transparent hover:border-white duration-200 flex items-center justify-center h-[70%] cursor-pointer">
                <Image className="w-24 object-cover mt-2 ml-1" src={amazon_logo} alt="amazon logo"/>
              </Link>
              {/*delivery*/}
              <div className="px-1 border border-transparent hover:border-white duration-200 items-center justify-center h-[70%] hidden lg:inline-flex cursor-pointer">
                  <div className="mt-3 px-1 text-white font-extrabold text-lg ">  
                    <GrLocation />
                  </div>
                  <div>    
                    <p className="text-xs">Deliver to</p>
                    <p className="text-white font-bold text-sm">Japan</p>
                  </div>
              </div>
              {/*search_bar*/}
              <div className="flex-1 h-10 hidden md:inline-flex items-center justify-between relative">
                  <div className="flex items-center justify-center relative h-full text-slate-900">
                    <label htmlFor="select_options" className="absolute text-xs cursor-pointer">All</label>
                    <select id="select_options" className="inline-flex w-14 h-full cursor-pointer rounded-l-md bg-[#E6E6E6] border-[3px] border-transparent outline-none focus-visible:border-amazon_yellow">
                    </select>
                  </div>
                  
                  <input className="flex w-full h-full rounded-r-md px-2 placeholder:text-base text-black border-[3px] border-transparent outline-none focus-visible:border-amazon_yellow" type="text" placeholder="Search Amazon Clone" />
                  <span className="w-12 h-full rounded-r-md text-black text-2xl flex justify-center items-center bg-amazon_search absolute right-0 cursor-pointer">
                      <GrSearch/>
                  </span>
              </div>
              {/*language_*/}
              <div className="px-1 border border-transparent hover:border-white duration-200 md:flex items-center h-[70%] cursor-pointer relative hidden">
                  <div className="flex items-center gap-1 mt-3 ml-3">    
                    <Image className="flex w-5 h-4 object-cover rounded-sm" src={usflag_icon} alt="amazon logo" />
                      <p className="flex font-bodyFont font-bold text-white mt-1 text-sm">EN
                          <span className="mt-[1px] ml-[-3px] text-stone-400 text-xl"><MdArrowDropDown /></span>
                      </p>
                  </div>
              </div>
              {/*sigin_*/}
              {
                userinfoData 
                ?
                (
                  <div className="flex flex-col justify-center items-start h-[70%] text-white cursor-pointer px-1 border border-transparent hover:border-white duration-200">
                    <div className="flex items-center gap-3">
                      <img src={userinfoData.image} alt="user_image" className="w-6 h-6 rounded-full  object-cover" />
                      <p className="text-sm">{userinfoData.name}</p>
                    </div>
                    <p className="text-xs">{userinfoData.email}</p>
                  </div>
                )
                : 
                (
                  <div onClick={() => signIn()} className="px-1 border border-transparent hover:border-white duration-200 flex items-center h-[70%] cursor-pointer relative">
                    <div className="flex flex-col justify-center items-start text-white">    
                      <p className="text-xs max-sm:text-xs">Hello, sign in</p>
                      <p className="flex justify-center font-bodyFont font-bold text-sm max-sm:text-xs">Account & Lists
                          <span className="mt-[1px] text-stone-400 text-xl"><MdArrowDropDown /></span>
                      </p>
                    </div>
                  </div>
                )
              }
              {/*orders_*/}
              <div className="px-1 border border-transparent hover:border-white duration-200 flex items-center h-[70%] cursor-pointer relative">
                  <div className=" text-white">
                    <p className="flex flex-col justify-center font-bodyFont text-xs">Returns
                        <span className="ml-[-3px] text-sm font-bold max-sm:text-xs">& Orders</span>
                    </p>
                  </div>
              </div>
              {/*cart_icon*/}
              <Link href={"/cart"} className="px-1 border border-transparent hover:border-white duration-200 flex items-center h-[70%] cursor-pointer text-white relative">
                <Image className="flex w-10 h-6 object-cover rounded-sm" src={cart_icon} alt="amazon logo"/>
                      <p className="mt-4 font-bodyFont font-bold text-sm max-lg:text-xs">Cart
            <span className="absolute top-0 max-lg:-top-1 left-[29.5%] max-lg:left-[32%] text-amazon_yellow font-bold text-lg">{ productData ? productData.length : 0}</span>
                      </p>
              </Link>
          </div>
    </div>
  )
}

export default Header