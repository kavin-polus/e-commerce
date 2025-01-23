import React, { useContext } from "react";
import { FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa";
import { CartContext } from "../../context/cartContext";
import CartSummary from "./CartSummary";

const ShoppingCart = () => {
  const { cartItems: cart, addItemToCart, removeProduct, removeItemFromCart } = useContext(CartContext);

  const handleIncrement = (product) => {
    if(product.quantity < product.stock) {
      addItemToCart(product);
    }
  };

  const handleDecrement = (product) => {
    if(product.quantity > 1) {
      removeItemFromCart(product); 
    }
  };

  const handleRemove = (product) => {
    removeProduct(product);
  };

  return (
    <div className="d-flex justify-content-between mx-5 mt-5">
      <div className="flex-item w-50">
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map((product) => (
            <div key={product._id} className="card mb-4 w-100">
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <button className="btn btn-light" onClick={() => handleDecrement(product)}>
                      <FaMinus />
                    </button>
                    <span className="mx-3">{product.quantity}</span>
                    <button className="btn btn-light" onClick={() => handleIncrement(product)}>
                      <FaPlus />
                    </button>
                  </div>
                  <button className="btn btn-danger" onClick={() => handleRemove(product)}>
                    <FaTrashAlt />
                  </button>
                  <div className="d-flex justify-content-between mb-4">
                    <strong>Total</strong>
                    <strong>${(product.price * product.quantity).toFixed(2)}</strong> 
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
