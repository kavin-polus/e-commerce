import React, { useEffect, useState } from 'react'
import api from '../../services/api';

const OrderHistory = () => {

    const [orders, setOrders] = useState([]);
    const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get(`/orderHistory/${userId}`);
        console.log(response);
        const fetchedOrders = Array.isArray(response.data.orders) ? response.data.orders : [];
        setOrders(fetchedOrders);
      } catch (error) {
        console.error('Error fetching order history:', error);
      }
    };

    fetchOrders();
  }, [userId]);


  return (
    <div>
      <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Order History</h2>

      <div className="space-y-6">
        {orders.length === 0 ? (
          <p className="text-gray-500">No orders found.</p>
        ) : (
          orders.map(order => (
            <div key={order._id} className="bg-white p-4 rounded-lg shadow-md">
              <h5 className="text-xl font-semibold text-gray-700">Order Date: {new Date(order.orderDate).toLocaleDateString()}</h5>
              <p className="text-gray-500 mb-4"><strong>Status:</strong> {order.status}</p>

              <ul className="space-y-2">
                {order.products.map(product => (
                  <li key={product.productId} className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-700">{product.productId.name}</span>
                    <span className="text-gray-600">Quantity: {product.quantity}</span>
                    <span className="text-gray-800 font-medium">${(product.price * product.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>

              <div className="flex justify-between items-center mt-4">
                <strong className="text-xl text-gray-800">Total: ${order.totalAmount.toFixed(2)}</strong>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
    </div>
  )
}

export default OrderHistory;
