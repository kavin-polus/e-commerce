import React, { useEffect, useState } from 'react';
import './tailwind.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginRegister from './components/LoginRegister/loginRegister';
import AddProduct from './components/Product/AddProduct';
import Home from './components/Home/Home';
import MenuBar from './components/NavBar/MenuBar';
import ShoppingCart from './components/Shopping/ShoppingCart';
import { CartProvider } from './context/cartContext';
import MyProductList from './components/Product/MyProductList';
import ProtectedRoute from './services/protectedRoute.js';

function App() {
  const role = useSelector((state) => state.role.role);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        setIsAuthenticated(true);
      }
    };

    checkAuthentication();
  }, []);
  const Layout = ({ children }) => (
    
      <div className="">
        <MenuBar />
        {children}
      </div>

  )
  return (
    <>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={isAuthenticated ? <Navigate to={role === 'seller' ? '/product' : '/home'} /> : <Navigate to="/login" />} />
            <Route path="/login" element={<LoginRegister />} />
            <Route path="/register" element={<LoginRegister />} />
            <Route path="/home" element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>

                <Home />

              </ProtectedRoute>
            } />


            <Route path="/product" element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Layout>
                  <AddProduct />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/shopCart" element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Layout>
                  <ShoppingCart />
                </Layout>
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
