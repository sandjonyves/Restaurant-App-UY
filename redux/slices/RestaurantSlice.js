import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    is_disabled:null
}


export const restaurantSlice = createSlice({
    name:"restaurant",
    initialState,
    reducers :{
        dish_choise :(state,action) => void (state.is_disabled= action.payload)
    }
})


export const {dish_choise} = restaurantSlice.actions
export default restaurantSlice.reducer