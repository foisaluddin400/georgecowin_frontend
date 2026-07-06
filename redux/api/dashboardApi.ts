import { baseApi } from "./baseApi";

export const dashboardApi = {
  getOverviewMetrics: () => baseApi.get("/dashboard/overview"),
};