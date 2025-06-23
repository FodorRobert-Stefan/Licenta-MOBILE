export const BASE_URL = 'https://8ca3-2a02-2f07-d304-2d00-cc02-4d4b-9151-9c60.ngrok-free.app';
export const API_PATHS = {
  registerUser: '/Generic/User',
  loginUser: '/User/login', 
};

export const getApiUrl = (path: string) => `${BASE_URL}${path}`;
