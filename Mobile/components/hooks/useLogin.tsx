import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import apiClient from "../generic/apiClient";
import { API_PATHS, getApiUrl } from "../generic/apiConfig";
import { handleApiResponse } from "../generic/handleApiResponse";

interface LoginPayload {
  email: string;
  password: string;
}

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (payload: LoginPayload) => {
    setLoading(true);
    setError(null);

    try {
      const res = await apiClient.post(API_PATHS.loginUser, payload);

      const accessToken = res.data.accessToken;
      const refreshToken = res.data.refreshToken;

      console.log("Access Token:", accessToken);
      console.log("Refresh Token:", refreshToken);

      await AsyncStorage.setItem("access_token", accessToken);
      await AsyncStorage.setItem("refresh_token", refreshToken);

      handleApiResponse(res, "Login successful!");
      return res.data;
    } catch (err: any) {
      console.log(err);
      const responseData = err?.response?.data || err?.response || err;
      setError(responseData?.message || "Login failed");
      handleApiResponse(responseData);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const refreshToken = async () => {
    const refreshToken = await AsyncStorage.getItem("refresh_token");
    if (!refreshToken) {
      console.warn("No refresh token found.");
      return;
    }

    try {
      const res = await apiClient.post(getApiUrl(API_PATHS.refreshToken), {
        refreshToken,
      });

      const newAccessToken = res.data.access_token;
      const newRefreshToken = res.data.refresh_token;

      console.log("Refreshed Access Token:", newAccessToken);
      console.log("Refreshed Refresh Token:", newRefreshToken);

      await AsyncStorage.setItem("access_token", newAccessToken);
      await AsyncStorage.setItem("refresh_token", newRefreshToken);
    } catch (err) {
      console.error("Token refresh failed", err);
    }
  };

  const startAutoRefresh = () => {
    setInterval(() => {
      refreshToken();
    }, 60 * 60 * 1000);
  };

  return { login, loading, error, refreshToken, startAutoRefresh };
}
