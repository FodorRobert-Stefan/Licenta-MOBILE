import { useState } from 'react';
import apiClient from '../generic/apiClient';
import { API_PATHS } from '../generic/apiConfig';
import { handleApiResponse } from '../generic/handleApiResponse';

export const useRegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  const handleRegister = async () => {
    try {
      const res = await apiClient.post(API_PATHS.registerUser, {
        email,
        password,
      });

      handleApiResponse(res, 'Registration completed successfully.');
    } catch (err: any) {
      const responseData = err?.response?.data || err?.response || err;
      handleApiResponse(responseData);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    passwordVisible,
    togglePasswordVisibility,
    handleRegister,
  };
};
