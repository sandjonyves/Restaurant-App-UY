import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    is_disabled:null,
    data : null
}


export const dishSlice = createSlice({
    name:"dish",
    initialState,
    reducers :{
        dish_choise :(state,action) => void (state.is_disabled= action.payload),
        dish :(state,action) => void (state.data= action.payload)

    }
})


export const {dish_choise,dish} = dishSlice.actions
export default dishSlice.reducer