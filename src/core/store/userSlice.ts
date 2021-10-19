import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "common/axios";
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
      const response = await axiosInstance.post<Tokens>("/cms/login", values);
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
      removeTokens(); // you have remove tokens before request, removing after awaiting for response will run iunto infinite loop of redirecting between dashboard and login
      const response = await axiosInstance.post("/cms/logout", tokens);
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
