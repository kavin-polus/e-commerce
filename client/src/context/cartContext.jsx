import React, { createContext, useEffect, useMemo, useState } from 'react';
import api from '../services/api';

export const CartContext = createContext();

export const CartProvider = ({children}) => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const userId = localStorage.getItem("userId");
  const productId = localStorage.getItem("productId");


  const fetchCartItems = async () => {
    console.log('Cart Items Updated:', cartItems);
    if (userId) {
      try {
        const response = await api.get(`/getCart/${userId}`);
        console.log(response);
        
        if (response.data && Array.isArray(response.data.cartItems)) {
          setCartItems(response.data.cartItems);
        } else {
          setCartItems([]);
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
        setCartItems([]);
      }
    }
  };

  const addItemToCart = async(product) => {

    const cartItem = { 
      userId, 
      productId: product._id, 
      quantity: 1 
    };
    try {
      const response = await api.post("/addItem",cartItem);
      setCartItems(response.data.cartItems);
      fetchCartItems()

    } catch (error) {
      console.error("Error adding item to cart:", error.response.data.message);
    }
    
  };

 
  

  const removeItemFromCart = async(cartItem) => {

    try {
      const response = await api.put("/updateQuantity", {
        
          userId,
        productId: cartItem.productId,
        quantity: cartItem.quantity,
        
      });
      console.log("Decrement",response.data);
      
      setCartItems(response.data.cartItems);
      fetchCartItems()
      
    } catch (error) {
      console.error('Error removing item from cart:', error.message);
    }
  };
  

  const removeProduct = async (product) => {
  

    try {
      const response = await api.delete('/removeItem', {
        data: {
          userId,
        productId: product.productId,
        }
      });
      setCartItems(response.data.cartItems);
      fetchCartItems()
    } catch (error) {
      console.error('Error removing product from cart:', error.message);
    }
  };

  const addProduct = (product) => {
    setProducts((prevProducts) => [...prevProducts, product]);
  };

  const getCartItemCount = useMemo(() => {
    return Array.isArray(cartItems) ? cartItems.length : 0;
  }, [cartItems]);

  const getTotalCost = useMemo(() => {
    return Array.isArray(cartItems)
      ? cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
      : 0;
  }, [cartItems]);

  const resetCartItems = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
  }


  useEffect(() => {
    

    fetchCartItems();
  }, []);
  

  return (
    <CartContext.Provider value={{ cartItems, getCartItemCount, getTotalCost, products, removeProduct, setProducts,removeItemFromCart,resetCartItems,addItemToCart, addProduct }}>
      {children}
    </CartContext.Provider>
  );
};
