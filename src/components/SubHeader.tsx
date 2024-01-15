import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { removeUser } from "@/store/slices/appSlice";
import { signOut } from "next-auth/react";
import { GiHamburgerMenu } from "react-icons/gi";

const SubHeader = () => {
    const { userinfoData,favouriteData } = useAppSelector((state) => state.amazon_clone);
    const dispatch = useAppDispatch();
    
  return (
      <div className="bg-amazon_light h-11 flex items-center text-white max-lg:text-xs">
          {/*All*/}
          <div className="flex gap-1 h-10 items-center px-5 border border-transparent hover:border-white duration-200 cursor-pointer max-lg:px-1">
              <div>   
                <GiHamburgerMenu/>
              </div>
              <p className=" text-sm font-bold">All</p>
          </div>
          {/*Today's Deals*/}
          <div className="w-full h-full flex items-center text-sm max-lg:text-xs">
              <div className="flex px-3 h-10 items-center border border-transparent hover:border-white duration-200 cursor-pointer rounded-sm max-lg:px-1">
                  <p>Todays Deals</p>
              </div>
              <div className="flex px-3 h-10 items-center border border-transparent hover:border-white duration-200 cursor-pointer rounded-sm max-lg:px-1">
                  <p>Registry</p>
              </div>
              <div className="flex px-3 h-10 items-center border border-transparent hover:border-white duration-200 cursor-pointer rounded-sm max-lg:px-1">
                  <p>Customer Service</p>
              </div>
              <div className="flex px-3 h-10 items-center border border-transparent hover:border-white duration-200 cursor-pointer rounded-sm max-lg:px-1">
                  <p>Gift Cards</p>
              </div>
              <div className="flex px-3 h-10 items-center border border-transparent hover:border-white duration-200 cursor-pointer rounded-sm max-lg:px-1">
                  <p>Sell</p>
              </div>
              <div className={`text-amazon_yellow px-3 h-10 items-center border border-transparent hover:border-white duration-200 cursor-pointer rounded-sm max-lg:px-1 ${userinfoData ? 'flex' : 'hidden'}`}>
                  <button onClick={()=>{signOut(),dispatch(removeUser())}}>Sign Out</button>
              </div>
          </div>
    </div>
  )
}

export default SubHeader