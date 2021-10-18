import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance, axiosSecureInstance } from "common/axios";
import {
  getTokens,
  removeTokens,
  saveTokens,
  isAccessTokenExpired,
} from "common/auth/tokens";
import { RequestLoginCredentials } from "types/novel-server.types";

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
      const response = await axiosInstance.post("/login", values);
      console.log({ dataInRedux: response.data });
      return response.data;
    } catch (error: any) {
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
