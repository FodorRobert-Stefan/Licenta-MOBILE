// src/api/apiClientDjango.ts

import axios from 'axios';
import { BASE_URL_DJANGO } from './apiConfigDjango';

const apiClientDjango = axios.create({
  baseURL: BASE_URL_DJANGO,
});

export default apiClientDjango;
