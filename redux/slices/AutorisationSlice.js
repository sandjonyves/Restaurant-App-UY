import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    is_disabled :null
}


export const autorisationSlice = createSlice({
    name:"autorisation",
    initialState,
    reducers :{
        disbale :(state,action) => void (state.is_disabled = action.payload)
    }
})


export const {disbale} = autorisationSlice.actions
export default autorisationSlice.reducer