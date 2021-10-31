import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance, axiosSecureInstance } from "common/axios";
import { removeTokens, saveTokens, getTokens } from "common/auth/tokens";
import {
  RequestLoginCredentials,
  RequestRemindPasswordCredentials,
  RequestRenewPassword,
  RequestUpdateUser,
  Tokens,
  UserProfile,
} from "types/novel-server.types";
import { RootState } from "common/store/store";

interface UserState {
  userProfile: UserProfile | null;
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
      removeTokens(); // you have to remove tokens before request, removing after awaiting for response will run iunto infinite loop of redirecting between dashboard and login
      const response = await axiosInstance.post("/cms/logout", tokens);
      return response.data;
    } catch (error: any) {
      removeTokens();
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchUserData = createAsyncThunk("user/getUserData", async () => {
  const response = await axiosSecureInstance.get<UserProfile>("/users/me");
  return response.data;
});

export const updateUserData = createAsyncThunk(
  "user/updateUserData",
  async (values: RequestUpdateUser) => {
    const response = await axiosSecureInstance.put("/users/me", values);
    return response.data;
  }
);

export const sendEmailToRemindPassword = createAsyncThunk(
  "user/sendEmailToRemindPassword",
  async (values: RequestRemindPasswordCredentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/users/remind-password",
        values
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resetUserPassword = createAsyncThunk(
  "user/resetUserPassword",
  async (
    values: RequestRenewPassword & { userId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post(
        `/users/renew-password/${values.userId}`,
        {
          password: values.password,
          repeatedPassword: values.repeatedPassword,
        } as RequestRenewPassword
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUserPassword = createAsyncThunk(
  "user/updateUserPassword",
  async (values: RequestRenewPassword, { rejectWithValue }) => {
    try {
      const response = await axiosSecureInstance.put(
        `/users/me/update-password`,
        values
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUserAvatar = createAsyncThunk(
  "user/updateUserAvatar",
  async (values: FormData, { rejectWithValue }) => {
    try {
      const response = await axiosSecureInstance.put(
        `/users/me/avatar`,
        values
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteUserAvatar = createAsyncThunk(
  "user/updateUserAvatar",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosSecureInstance.delete(`/users/me/avatar`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const counterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.userProfile = action.payload;
    });
  },
});

export const selectUserProfile = (state: RootState) => state.user.userProfile;

export default counterSlice.reducer;
