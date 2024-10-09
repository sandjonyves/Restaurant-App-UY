import { createSlice } from "@reduxjs/toolkit";

// R1:REstaurant1,R2:restaurant2 
const initialState = {
    is_disabled : false,
    r1_disabled : false,
    r2_disabled : false,
    R2_order_is_disabled : false,
    R2_valid_order_is_disabled : false,
    
}


export const autorisationSlice = createSlice({
    name:"autorisation",
    initialState,
    reducers :{
        disbale :(state,action) => void (state.is_disabled = action.payload),

        R1_disabled :(state,action) => void (state.r1_disabled= action.payload),
        // R1_valid_disabled :(state,action) => void (state.R1_valid_order_is_disabled = action.payload),

        R2_disabled :(state,action) => void (state.r2_disabled = action.payload),
        // R2_valid_disabled :(state,action) => void (state.R2_valid_order_is_disabled = action.payload)
    }
})


export const {disbale,R1_disabled,R2_disabled} = autorisationSlice.actions
export default autorisationSlice.reducer