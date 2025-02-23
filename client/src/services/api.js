
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8001/api/auth',
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
})



api.interceptors.request.use(config => {

    const token = localStorage.getItem('accessToken');
    console.log(token);
    
    if(token) {
        config.headers['Authorization'] = `Bearer ${token}`
    }
    return config;
},error => 
     Promise.reject(error)
    
)

api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );

export default api
