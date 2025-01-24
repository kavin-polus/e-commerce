import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRole } from '../../reduxStore/roleSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../../services/api';

const LoginRegister = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [roles, setRoleLocal] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password || (isLogin && !roles)) {
      setError('All fields are required.');
      return;
    }

    const payload = isLogin   ? { email, password}  : { email, password };

    try {
      if (isLogin) {
        const response = await api.post('/login', payload);
        localStorage.setItem('userId',response.data.user.userId)
        
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        dispatch(setRole(roles));
        
        if (roles === 'seller') {
          navigate('/product');
        } else {
          navigate('/home');
        }
      } else {
        const response = await api.post('/register', payload);
        localStorage.setItem('token', response.data.token);
        navigate('/login');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong.');
    }
  };

  const handleLoginRegister = () => {
    setIsLogin(!isLogin);
    navigate(isLogin ? '/register' : '/login');
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">{isLogin ? 'Login' : 'Register'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
            {isLogin && (
              <div className="flex space-x-6 mb-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="buyer"
                    name="roles"
                    value="buyer"
                    checked={roles === 'buyer'}
                    onChange={() => setRoleLocal('buyer')}
                    className="mr-2"
                  />
                  <label htmlFor="buyer" className="text-sm">Buyer</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="seller"
                    name="roles"
                    value="seller"
                    checked={roles === 'seller'}
                    onChange={() => setRoleLocal('seller')}
                    className="mr-2"
                  />
                  <label htmlFor="seller" className="text-sm">Seller</label>
                </div>
              </div>
            )}

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div>
              <button
                type="submit"
                className="w-full py-2 px-6 bg-gray-800 text-white rounded-lg hover:bg-gray-700 focus:outline-none"
              >
                {isLogin ? 'Login' : 'Register'}
              </button>
            </div>
          </div>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={handleLoginRegister}
            className="text-blue-600 hover:text-blue-800"
          >
            {isLogin ? "Don't have an account? Register here" : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
