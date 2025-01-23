import { configureStore } from "@reduxjs/toolkit";
import roleReducer from './roleSlice';
import cartReducer from './cartSlice'

const store = configureStore({
    reducer: {
        role: roleReducer,
        cart: cartReducer,
    }
})

export default store;