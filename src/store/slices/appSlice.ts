import { UpdateProductsQty } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

interface IntialProductState{
    productData: UpdateProductsQty[],
    favouriteData: UpdateProductsQty[],
    allproductData: UpdateProductsQty[],
    userinfoData: any
}
const initialState:IntialProductState = {
    productData: [],
    favouriteData: [],
    allproductData: [],
    userinfoData: null,
}

export const appSlice = createSlice({
    name: "appSlice",
    initialState,
    reducers: {
        addtoCart: (state, action) => {

            const exitingProducts = state.productData.find((item: UpdateProductsQty) => item.id === action.payload.id)
            if (exitingProducts) {
                exitingProducts.quantity += action.payload.quantity;
            }
            else {
                state.productData.push(action.payload);
                console.log(state.productData)
            }
        },
        addtoFavourite: (state, action) => {
            const exitingProducts = state.favouriteData.find((item: UpdateProductsQty) => item.id === action.payload.id)
            if (exitingProducts) {
                exitingProducts.quantity += action.payload.quantity;
            } else {
                state.favouriteData.push(action.payload);
            }
        },
        increaseQuantity: (state, action) => {
            const exitingProducts = state.productData.find((item: UpdateProductsQty) => item.id === action.payload.id)
            exitingProducts && exitingProducts.quantity++;
        },
        decreaseQuantity: (state, action) => {
            const exitingProducts = state.productData.find((item: UpdateProductsQty) => item.id === action.payload.id)
            if (exitingProducts?.quantity === 1) {
                exitingProducts.quantity = 1
            } else {
                exitingProducts!.quantity--;
            }
        },
        deleteProduct: ( state,action) => {
            state.productData = state.productData.filter((item)=>item.id !== action.payload.id)
        },
        deleteFavouriteProduct: ( state,action) => {
            state.favouriteData = state.favouriteData.filter((item)=>item.id !== action.payload.id)
        },
        resetCart: (state) => {
            state.productData = [];
        },
        resetFavourite: (state) => {
            state.favouriteData = [];
        },
        addUser: (state, action) => {
            state.userinfoData = action.payload
        },
        removeUser: (state) => {
            state.userinfoData = null;
        },
        setAllProductData: (state, action) => {
            state.allproductData = action.payload
        }
    }
})

export const { addtoCart,addtoFavourite,deleteFavouriteProduct,resetFavourite,increaseQuantity,decreaseQuantity,deleteProduct,resetCart,addUser,removeUser,setAllProductData } = appSlice.actions;
export default appSlice.reducer;