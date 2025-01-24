import React, { useContext } from "react";
import { CartContext } from "../../context/cartContext";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

const CartSummary = () => {
  const { cartItems, resetCartItems } = useContext(CartContext);
  const { getCartItemCount } = useContext(CartContext);
  const navigate = useNavigate();

  console.log("order",cartItems);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = cartItems.map(item => ({
      productId: item.productId, 
      quantity: item.quantity,
      price: item.product.price 
    }));
    

    try {
      const response = await api.post('/orders', { cartItems: orderData });

      if (response.status === 201) {
        alert('Order placed successfully!');
        resetCartItems();
        navigate('/product');
      } else {
        alert(`Error: ${response.data.message}`);
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('An error occurred while placing your order.');
    }
  };

  const safeCartItems = Array.isArray(cartItems) ? cartItems : [];

  const totalQuantity = safeCartItems.reduce((acc, product) => acc + product.quantity, 0);

  const totalCost = safeCartItems.reduce((acc, cartItem) => acc + cartItem.totalPrice, 0);
  
  const itemCount = getCartItemCount || 0;

  return (
    <div className="card w-50 mx-auto h-75">
      <div className="card-body">
        <h5 className="card-title">Order Summary</h5>

        <div className="d-flex justify-content-between mb-3">
          <span>Items</span>
          <span>{itemCount}</span>
        </div>

        <div className="mb-3">
          <h6>Products:</h6>
          {safeCartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            safeCartItems.map((cartItem) => (
              <div key={cartItem._id} className="d-flex justify-content-between">
                <span>{cartItem.product?.name || 'Product Name Not Available'}</span>
                <span>{cartItem.quantity}</span>
                <span>${cartItem.totalPrice.toFixed(2)}</span>
              </div>
            ))
          )}
        </div>

        <div className="d-flex justify-content-between mb-3">
          <span>Total Quantity</span>
          <span>{totalQuantity}</span>
        </div>

        <hr />
        <div className="d-flex justify-content-between mb-4">
          <strong>Total</strong>
          <strong>${totalCost.toFixed(2)}</strong>
        </div>
        <button className="btn btn-primary w-100" onClick={handleSubmit}>Place Order</button>
      </div>
    </div>
  );
};

export default CartSummary;
