import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance, axiosSecureInstance } from "common/axios";
import { removeTokens, saveTokens, getTokens } from "common/auth/tokens";
import { RequestLoginCredentials, Tokens } from "types/novel-server.types";

interface UserState {
  userProfile: number | null;
}

const initialState: UserState = {
  userProfile: null,
};

export const login = createAsyncThunk(
  "login",
  async (values: RequestLoginCredentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<Tokens>("/login", values);
      saveTokens(response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk(
  "logout",
  async (_, { rejectWithValue }) => {
    const tokens = getTokens();
    try {
      const response = await axiosInstance.post("/logout", tokens);
      removeTokens();
      return response.data;
    } catch (error: any) {
      removeTokens();
      return rejectWithValue(error.response.data);
    }
  }
);

const counterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export default counterSlice.reducer;
