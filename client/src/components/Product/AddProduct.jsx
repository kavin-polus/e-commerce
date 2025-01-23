import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import MyProductList from './MyProductList';
import { CartContext } from '../../context/cartContext';
import api from '../../services/api';

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
  });
  const [activeTab, setActiveTab] = useState('myProducts');

  const { addProduct,products,setProducts } = useContext(CartContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = {
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
    };

    try {
      const response = await api.post('/createProduct', newProduct);
      addProduct(response.data);
      setProduct({ name: '', description: '', price: '', stock: '' });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const [currentUserId, setCurrentUserId] = useState(localStorage.getItem("userId"));

  useEffect(() => {
    if (activeTab === 'myProducts' && currentUserId) {
      const fetchProducts = async () => {
        try {
          const response = await api.get('/getUserProduct');
          console.log(response);
          
          setProducts(response.data.products);
          
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
      fetchProducts();
    }
  }, [activeTab]);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-6">Product Management</h2>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('myProducts')}
          className={`px-4 py-2 font-medium text-sm rounded-t-lg focus:outline-none ${
            activeTab === 'myProducts' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          My Products
        </button>

        <button
          onClick={() => setActiveTab('otherProducts')}
          className={`px-4 py-2 font-medium text-sm rounded-t-lg focus:outline-none ${
            activeTab === 'otherProducts' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Other Products
        </button>
        <button
          onClick={() => setActiveTab('addProduct')}
          className={`px-4 py-2 font-medium text-sm rounded-t-lg focus:outline-none ${
            activeTab === 'addProduct' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Add Product
        </button>
      </div>

      <div className="w-full max-w-4xl">
        {activeTab === 'myProducts' && (
          <div className="bg-gray-100 p-4 rounded shadow-md">
            <h3 className="text-xl font-semibold mb-4">My Products</h3>
            <MyProductList products={products} />
          </div>
        )}

        {activeTab === 'otherProducts' && (
          <div className="bg-gray-100 p-4 rounded shadow-md">
            <h3 className="text-xl font-semibold mb-4">Browse Other Products</h3>
            <p>This section can contain a list of other products, or you can add features like product search and filters here.</p>
          </div>
        )}

        {activeTab === 'addProduct' && (
          <div className="bg-gray-100 p-4 rounded shadow-md">
            <h3 className="text-xl font-semibold mb-4">Add New Product</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Description:</label>
                <input
                  type="text"
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Price:</label>
                <input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Stock:</label>
                <input
                  type="number"
                  name="stock"
                  value={product.stock}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Add Product
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddProduct;
