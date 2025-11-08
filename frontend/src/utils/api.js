// api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

export const apiRequest = async (
  method,
  url,
  data = null,
  token = null,
  config = {}
) => {
  try {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const options = {
      method,
      url,
      headers,
      ...config,
      ...(method.toLowerCase() === "get" ? { params: data } : { data }),
    };

    const response = await api(options);

    // Destructure due to structured response coming from backend
    return response.data?.data ?? response.data;
  } catch (error) {
    // handle expired token
    if (
      error.response?.status === 401 &&
      error.response?.data?.message?.toLowerCase().includes("expired") &&
      token
    ) {
      try {
        const refreshRes = await api.post("/api/users/refresh-token"); // Get new access token
        const newAccessToken = refreshRes.data.accessToken;

        // Retry original request
        const retryOptions = {
          method,
          url,
          headers: { Authorization: `Bearer ${newAccessToken}` },
          ...config,
          ...(method.toLowerCase() === "get" ? { params: data } : { data }),
        };
        return await api(retryOptions);
      } catch (refreshError) {
        console.error("Refresh failed:", refreshError);
        throw refreshError;
      }
    }
    throw error;
  }
};
