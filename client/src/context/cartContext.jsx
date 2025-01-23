import React, { createContext, useMemo, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({children}) => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  

  const addItemToCart = (product) => {
    const existingProduct = cartItems.find(item => item._id === product._id);
    
    if (existingProduct) {
      if (existingProduct.quantity < product.stock) {
        setCartItems(prevItems =>
          prevItems.map(item =>
            item._id === product._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      } else {
        alert("Not enough stock available");
      }
    } else {
      if (product.stock > 0) {
        setCartItems(prevItems => [
          ...prevItems,
          { ...product, quantity: 1 }
        ]);
      } else {
        alert("Not enough stock available");
      }
    }
  };
  

  const removeItemFromCart = (product) => {
    setCartItems(prevItems => 
      prevItems.map(item =>
        item._id === product._id
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 0 }
          : item
      ).filter(item => item.quantity > 0)
    );
  };
  

  const removeProduct = (product) => {
    setCartItems(prevItems => prevItems.filter(item => item._id !== product._id));
  };

  const addProduct = (product) => {
    setProducts((prevProducts) => [...prevProducts, product]);
  };

  const getCartItemCount = useMemo(() => {
    return cartItems.length;
  }, [cartItems]);

  const getTotalCost = useMemo(() => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [cartItems]);

  const resetCartItems = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
  }

  

  return (
    <CartContext.Provider value={{ cartItems, getCartItemCount, getTotalCost, products, removeProduct, setProducts,removeItemFromCart,resetCartItems,addItemToCart, addProduct }}>
      {children}
    </CartContext.Provider>
  );
};
