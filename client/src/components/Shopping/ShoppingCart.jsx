import React, { useContext, useEffect } from "react";
import { FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa";
import { CartContext } from "../../context/cartContext";
import CartSummary from "./CartSummary";

const ShoppingCart = () => {
  const { cartItems: cart, addItemToCart, removeProduct, removeItemFromCart } = useContext(CartContext);

  const handleIncrement = async (cartItem) => {
    if (cartItem.product.stock > 0) {
      console.log(cartItem.product.stock);
      console.log(cartItem.quantity);
      
      await addItemToCart(cartItem.product);
    } else {
      
      
      alert("Cannot add more items to cart than are available in stock.");
    }
  };
  
  const handleDecrement = async (cartItem) => {
   
      if(cartItem.quantity > 0) {
        await removeItemFromCart(cartItem);
      } else {
        await removeProduct(cartItem);
      }
  };
  

  const handleRemove = async (cartItem) => {
    await removeProduct(cartItem);
  }

  return (
    <div className="d-flex justify-content-between mx-5 mt-5">
      <div className="flex-item w-50">
        {Array.isArray(cart) && cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          Array.isArray(cart) &&
          cart.map((cartItem) => (
            <div key={cartItem._id} className="card mb-4 w-100">
              <div className="card-body">
                <h5 className="card-title">{cartItem.product?.name || 'Product Name Not Available'}</h5>
                <p className="card-text">{cartItem.product?.description || 'Description not available'}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <button className="btn btn-light" onClick={() => handleDecrement(cartItem)}>
                      <FaMinus />
                    </button>
                    <span className="mx-3">{cartItem.quantity}</span>
                    <button className="btn btn-light" onClick={() => handleIncrement(cartItem)}>
                      <FaPlus />
                    </button>
                  </div>
                  <button className="btn btn-danger" onClick={() => handleRemove(cartItem)}>
                    <FaTrashAlt />
                  </button>
                  <div className="d-flex justify-content-between mb-4">
                    <strong>Total</strong>
                    <strong>${cartItem.product?.price || 'Price Not Available'}</strong>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="flex-item w-50">
        <CartSummary />
      </div>
    </div>
  );
};

export default ShoppingCart;
