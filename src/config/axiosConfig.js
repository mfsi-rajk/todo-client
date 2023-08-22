import axios from 'axios';

const BASE_URL = 'http://localhost:4000/api/';
const GCP_TOKEN = localStorage.getItem('token');
const TOKEN_KEY = 'Bearer ' + GCP_TOKEN;
const headers = {
  Authorization: TOKEN_KEY,
};

const instance = axios.create({
  baseURL: BASE_URL,
  headers: headers,
  withCredentials: true,
});

instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

export default instance;
