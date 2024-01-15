import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addUser } from "@/store/slices/appSlice";
import { Products } from "@/types";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GrLocation, GrSearch } from "react-icons/gr";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdArrowDropDown } from "react-icons/md";
import miss_item_icon from "../assets/icons/opps_miss_item.gif";
import amazon_logo from "../assets/images/amazon_logo.png";
import cart_icon from "../assets/images/cart_icon.png";
import usflag_icon from "../assets/images/usflag_icon.svg";
import SearchProductCard from "./SearchProduct";

const Header = () => {
  const { data: session } = useSession()
  const { productData, favouriteData, userinfoData,allproductData } = useAppSelector((state) => state.amazon_clone)
  const [searchValue, setSearchValue] = useState("");
  const [allData, setAllData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (session) {
      dispatch(addUser({
        name: session.user?.name,
        email: session.user?.email,
        image: session.user?.image
      }))
    }
  }, [session])

  useEffect(() => {
    setAllData(allproductData.productData)
  }, [allData])
  
  useEffect(() => {
    const filtered = allData?.filter((item) => item.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()))
    setFilteredProducts(filtered)

  },[searchValue])

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
                  <label htmlFor="select_options" className="flex items-center gap-1 absolute text-xs cursor-pointer">All
                    <span><IoMdArrowDropdown /></span>
                  </label>
                  <div
                    className="inline-flex w-14 h-full cursor-pointer rounded-l-md bg-[#E6E6E6] border-[3px] border-transparent outline-none focus-visible:border-amazon_yellow">
                  </div>
                </div>
                <div className="flex w-full h-full flex-col">
            <input onChange={(e) => setSearchValue(e.target.value)} value={searchValue} className="flex w-full h-full rounded-r-md px-2 md:text-xs placeholder:text-base text-black border-[3px] border-transparent outline-none focus-visible:border-amazon_yellow" type="text" placeholder="Search Amazon Clone" />
                    <span className="w-12 h-full rounded-r-md text-black text-2xl flex justify-center items-center bg-amazon_search absolute right-0 cursor-pointer">
                        <GrSearch/>
                    </span>
                  {/* --------- Search portions ---------- */}
                  {
                    searchValue &&
                    <div className="bg-slate-50 text-amazon_blue absolute top-10 w-[85.8%] h-60 z-auto flex flex-col overflow-x-scroll p-4 gap-2">
                      {
                      filteredProducts.length > 0 ?
                      (<>
                        {searchValue && filteredProducts.map((item: Products) => (
                          <Link
                            key={item.id}
                            href={
                              {
                                pathname: `/products/${item.id}`,
                                query: {
                                  id: item.id,
                                  title: item.title,
                                  category: item.category,
                                  description: item.description,
                                  image: item.image,
                                  price: item.price,
                                  quantity: 1,
                                  rate: item.rating.rate,
                                  count: item.rating.count
                                }
                              }
                            }
                            onClick={()=>setSearchValue("")}
                            >
                            <SearchProductCard item={item} />
                            </Link>
                        ))}
                      </>) :
                      (<div className="flex flex-col items-center justify-center">
                        <p>Opps!!Search Item not found!</p>
                        <Image src={ miss_item_icon} alt="gif_image" width={100} height={100} />
                      </div>)
                      }
                    </div>
                  }
                </div>
              </div>
              {/*language_*/}
              <div className="px-1 border border-transparent hover:border-white duration-200 lg:flex items-center h-[70%] cursor-pointer relative hidden">
                  <div className="flex items-center gap-1 mt-3 ml-3">    
                    <Image className="flex w-5 h-4 object-cover rounded-sm" src={usflag_icon} alt="amazon logo" />
                      <p className="flex font-bodyFont font-bold text-white mt-1 text-sm">EN
                          <span className="mt-[1px] ml-[-3px] text-stone-400 text-xl"><MdArrowDropDown /></span>
                      </p>
                  </div>
                </div>
                {/*---- favourite ----*/}
                <div className="flex px-3 h-[70%] max-lg:text-xs py-1 items-center border border-transparent hover:border-white duration-200 cursor-pointer rounded-sm max-lg:px-1">
                  <div className="text-sm text-white">
                      <Link href={"/favourite"} className="flex flex-col items-center justify-center text-xs">
                      <span>
                      Favourite
                      </span>
                      <span className="font-semibold">Items: <span className={`text-amazon_yellow font-bold text-lg max-lg:text-xs ${favouriteData.length > 0 ? 'animate-pulse' : "animate-none"}`} >{favouriteData && userinfoData ? favouriteData.length : 0}
                      </span>
                      </span>
                      </Link>
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
              <div className="max-lg:hidden px-1 border border-transparent hover:border-white duration-200 flex items-center h-[70%] cursor-pointer relative">
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
            <span className="absolute top-0 max-lg:-top-1 left-[29.5%] max-lg:left-[32%] text-amazon_yellow font-bold text-lg max-lg:text-sm">{ productData ? productData.length : 0}</span>
                      </p>
              </Link>
          </div>
    </div>
  )
}

export default Header