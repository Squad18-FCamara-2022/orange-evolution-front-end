import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://sqd18-orange-evolution-backend.herokuapp.com',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
