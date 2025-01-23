import React, { useContext } from "react";
import { FaEdit, FaTrashAlt, FaHeart, FaShareAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/cartContext";

const MyProductList = ({ products = [] }) => {
  const navingate = useNavigate();
  const { addItemToCart } = useContext(CartContext);
  const handleAddToCart = (product) => {
    addItemToCart(product);
    navingate("/shopCart");
  };

  return (
    <div>
      {products.length === 0 ? (
        <p>No products added yet.</p>
      ) : (
        products.map((product) => (
          <article
            key={product._id}
            className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden mb-4"
          >
            <div className="p-6 flex flex-col justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                {product.name}
              </h3>
              <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                {product.description}
              </p>
              <div className="mt-4 text-sm text-gray-800">
                <p>Price: ${product.price}</p>
                <p>Stock: {product.stock}</p>
              </div>
              <div className="mt-4 flex space-x-4 text-gray-600">
                <button className="text-xl hover:text-gray-900">
                  <FaEdit />
                </button>
                <button className="text-xl hover:text-gray-900">
                  <FaTrashAlt />
                </button>
                <button className="text-xl hover:text-gray-900">
                  <FaHeart />
                </button>
                <button className="text-xl hover:text-gray-900">
                  <FaShareAlt />
                </button>

                <button
                  className="btn btn-primary"
                  onClick={() => handleAddToCart(product)}
                 
                >
                  {product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
                </button>
              </div>
            </div>
          </article>
        ))
      )}
    </div>
  );
};

export default MyProductList;
