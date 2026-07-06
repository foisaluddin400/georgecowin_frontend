import { baseApi } from "./baseApi";

export const financeApi = {
  getInvoices: () => baseApi.get("/finance/invoices"),
};