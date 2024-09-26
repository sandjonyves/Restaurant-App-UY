
import { configureStore } from "@reduxjs/toolkit"
import { combineReducers ,createStore} from "redux"
import { persistStore, persistReducer } from 'redux-persist'
import storage from '@react-native-async-storage/async-storage'

import authReducer from "@/redux/slices/authSlice"
import commandReducer from "@/redux/slices/CommandSlice"
import dishReducer from "@/redux/slices/DishSlice"
import autorisationReducer from "@/redux/slices/AutorisationSlice"
const persistConfig = {
    key :"root",
    storage:storage
}


const reducer = combineReducers({
    auth : authReducer,
    command: commandReducer,
    dish:dishReducer,
    autorisation : autorisationReducer
})


const persistedReducer = persistReducer(persistConfig, reducer)


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            // Ignore these action paths
            ignoredActions: ['persist/PERSIST'],
            // Ignore these field paths in the state
            ignoredPaths: ['register', 'rehydrate'],
          },
        }),
  });
  export const persistor = persistStore(store)