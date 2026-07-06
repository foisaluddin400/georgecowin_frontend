import { baseApi } from "./baseApi";

export const productionApi = {
  getProjects: () => baseApi.get("/production/projects"),
};