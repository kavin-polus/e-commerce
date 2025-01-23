import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { total_Price, total_Quantity } from "../../reduxStore/cartSlice";
import { CartContext } from "../../context/cartContext";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

const CartSummary = () => {
  const { getCartItemCount } = useContext(CartContext);
  const { getTotalCost, cartItems, resetCartItems } = useContext(CartContext);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const orderData = cartItems.map(item => ({
      productId: item._id,
      quantity: item.quantity,
      price: item.price
    }));
  
    try {
      const response = await api.post('/orders', { cartItems: orderData });
  
      if (response.status === 201) {
        alert('Order placed successfully!');
        resetCartItems();
        navigate('/product')

      } else {
        alert(`Error: ${response.data.message}`);
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('An error occurred while placing your order.');
    }
  };
  

  return (
    <div className="card w-50 mx-auto h-75">
      <div className="card-body">
        <h5 className="card-title">Order Summary</h5>

        <div className="d-flex justify-content-between mb-3">
          <span>Items</span>
          <span>{getCartItemCount}</span>
        </div>

        <div className="mb-3">
          <h6>Products:</h6>
          {cartItems.length === 0 ? (
            <p>No products in the cart.</p>
          ) : (
            cartItems.map((product) => (
              <div key={product._id} className="d-flex justify-content-between">
                <span>{product.name}</span>
                <span>{product.quantity}</span>
              </div>
            ))
          )}
        </div>
        <div className="d-flex justify-content-between mb-3">
          <span>quantity</span>
          <span>
            {cartItems.reduce((acc, product) => acc + product.quantity, 0)}
          </span>
        </div>

        <hr />
        <div className="d-flex justify-content-between mb-4">
          <strong>Total</strong>
          <strong>{getTotalCost}</strong>
        </div>
        <button className="btn btn-primary w-100" onClick={handleSubmit}>Place Order</button>
      </div>
    </div>
  );
};

export default CartSummary;
