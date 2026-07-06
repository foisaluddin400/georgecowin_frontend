import { baseApi } from "./baseApi";

export const talentApi = {
  getProfiles: () => baseApi.get("/talent/profiles"),
};