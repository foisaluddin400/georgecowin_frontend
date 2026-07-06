import { baseApi } from "./baseApi";

export const crmApi = {
  getLeads: () => baseApi.get("/crm/leads"),
};