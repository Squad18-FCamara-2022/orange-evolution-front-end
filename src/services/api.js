import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://orange-evolution-sqd18-backend.herokuapp.com',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
