import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setRole } from '../../reduxStore/roleSlice';
import { FaShoppingCart } from 'react-icons/fa';
import { total_Quantity } from "../../reduxStore/cartSlice";
import { CartContext } from "../../context/cartContext";

const MenuBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector((state) => state.role);

  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    dispatch(setRole(null));
    console.log("Redirecting to login...");
    console.log("Role after logout:",role);
    navigate("/login");
  };
  

 const {getCartItemCount} = useContext(CartContext)

  return (
    <header className="bg-white">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
          </a>
        </div>

        <div className="hidden lg:flex lg:gap-x-12">
          <Link to="/home" className="text-sm/6 font-semibold text-gray-900">
            Home
          </Link>
          <Link to="/product" className="text-sm/6 font-semibold text-gray-900">
            Product
          </Link>
          <Link to="/shopCart" className="text-sm/6 font-semibold text-gray-900">
            Shopping
          </Link>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center space-x-6">
          <Link onClick={handleLogout} className="text-sm/6 font-semibold text-gray-900">
            Log Out
          </Link>
          <div className="relative">
            <FaShoppingCart className="text-3xl text-gray-900" />
            <span className="absolute top-0 right-0 bg-danger text-white text-xs rounded-full w-5 h-5 text-center">
              {getCartItemCount}
            </span>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default MenuBar;
