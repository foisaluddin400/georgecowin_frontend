import { baseApi } from "./baseApi";

export const authApi = {
  login: (credentials: object) => baseApi.post("/auth/login", credentials),
  logout: () => baseApi.post("/auth/logout"),
};