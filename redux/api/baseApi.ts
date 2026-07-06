import axiosInstance from "@/lib/axios";

export const baseApi = {
  get: <T>(url: string, params?: object) => axiosInstance.get<T>(url, { params }),
  post: <T>(url: string, data?: object) => axiosInstance.post<T>(url, data),
  put: <T>(url: string, data?: object) => axiosInstance.put<T>(url, data),
  delete: <T>(url: string) => axiosInstance.delete<T>(url),
};