export const BASE_URL = 'https://4903-2a02-2f07-d304-2d00-c9d-63a1-8d80-ebe2.ngrok-free.app';
export const API_PATHS = {
  registerUser: '/Generic/User',
  loginUser: '/User/login', 
    refreshToken: '/User/refresh',
};

export const getApiUrl = (path: string) => `${BASE_URL}${path}`;
