import { createSlice } from "@reduxjs/toolkit";


const initialState = {
     products : [],
     stock : []
}


  const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        add_Increment: (state, action) => {
           const product =  state.products.find((products) => products._id === action.payload)
           if(product) {
            product.quantity += 1
           }
        },

        sub_Decrement: (state, action) => {
            const product = state.products.find((products) => products._id === action.payload)
            if(product) {
                product.quantity -= 1
            }
        },

        remove_Product: (state, action) => {
           state.products = state.products.filter((products) => products._id !== action.payload)
        },

        setProducts(state, action) {
            state.products = action.payload;
        },

        add_Cart_Item : (state, action) => {
            console.log(action);
            
            const existingProduct = state.products.find((product) => product._id === action.payload._id);
            console.log("Existing product",existingProduct._id);
            
            if (existingProduct) {
                existingProduct.quantity += 1;
              } else {
                state.products.push({ ...action.payload, quantity: 1 });
              }
      
        }

    }
  })

  export const total_Quantity = (state) => {
    return state.cart.products.reduce((total,product) => total + product.quantity ,0)
}

export const total_Price = (state) => {
    return state.cart.products.reduce((total,product) => total + product.price * product.quantity, 0)
}

  export const {add_Increment,sub_Decrement,remove_Product,setProducts,add_Cart_Item} = cartSlice.actions;
  export default cartSlice.reducer; 