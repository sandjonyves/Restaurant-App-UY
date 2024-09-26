import { createSlice } from "@reduxjs/toolkit";


const initialState ={
    commandData:''
}

export const commandSlice = createSlice({
    name:"command",
    initialState,
    reducers :{
        saveCommand :(state,action) => void (state.commandData = action.payload)
    }
})



export const {saveCommand} = commandSlice.actions
export default commandSlice.reducer