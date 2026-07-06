import { baseApi } from "./baseApi";

export const userApi = {
  getProfile: () => baseApi.get("/user/profile"),
  updateProfile: (data: object) => baseApi.put("/user/profile", data),
};