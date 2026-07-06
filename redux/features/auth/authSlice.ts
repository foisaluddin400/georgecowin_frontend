
import { AuthState, User } from "@/types";
import { storage } from "@/utils/storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit/react";


const STORAGE_KEY = "enterprise_auth";

const getInitialState = (): AuthState => {
  const savedAuth = storage.get<User>(STORAGE_KEY);
  return {
    user: savedAuth,
    isLoading: false,
  };
};

const initialState: AuthState = getInitialState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      storage.set(STORAGE_KEY, action.payload);
    },
    logout: (state) => {
      state.user = null;
      storage.remove(STORAGE_KEY);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { loginSuccess, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;