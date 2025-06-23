import axios from 'axios';
import { BASE_URL } from './apiConfig';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
