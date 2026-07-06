import { baseApi } from "./baseApi";

export const operationsApi = {
  getContracts: () => baseApi.get("/operations/contracts"),
};