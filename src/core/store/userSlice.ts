import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance, axiosSecureInstance } from "common/axios";
import { removeTokens, saveTokens, getTokens } from "common/auth/tokens";
import {
  AccessToken,
  FailedReqMsg,
  RequestLoginCredentials,
  RequestRemindPasswordCredentials,
  RequestRenewPassword,
  RequestUpdateUser,
  Tokens,
  UserProfile,
} from "types/novel-server.types";
import { RootState } from "common/store";
import {
  getRefreshingTimeout,
  removeRefreshingTimeout,
} from "common/wrappers/RefreshAccessTokenWrapper/refreshAccessTokenLSTokens";
import { CancelToken } from "axios";

interface UserState {
  userProfile: UserProfile | null;
  isProfileLoading: boolean;
}

const initialState: UserState = {
  userProfile: null,
  isProfileLoading: false,
};

export const login = createAsyncThunk(
  "login",
  async (
    {
      values,
      cancelToken,
    }: { values: RequestLoginCredentials; cancelToken?: CancelToken },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post<Tokens>("/cms/login", values, {
        cancelToken,
      });
      saveTokens(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue((error as FailedReqMsg).message);
    }
  }
);

export const refreshAccessToken = async (): Promise<AccessToken> => {
  const tokens = getTokens();

  const response = await axiosInstance.post<AccessToken>("/cms/refresh-token", {
    refreshToken: tokens!.refreshToken,
  });
  saveTokens({
    accessToken: response.data.accessToken,
    refreshToken: tokens!.refreshToken,
  });
  return response.data;
};

export const handleRememberMe = () => {
  const tokens = getTokens();
  axiosInstance.post("/cms/logout", tokens);
  removeTokens();
};

export const logout = createAsyncThunk(
  "logout",
  async (_, { rejectWithValue }) => {
    const tokens = getTokens();
    try {
      getRefreshingTimeout() && window.clearTimeout(getRefreshingTimeout()!);
      removeRefreshingTimeout();
      removeTokens(); // you have to remove tokens before request, removing after awaiting for response will run iunto infinite loop of redirecting between dashboard and login

      window.removeEventListener("unload", handleRememberMe); // remove event listener as it is no longer needed becaucse you remove tokens anyway

      const response = await axiosInstance.post("/cms/logout", tokens);
      return response.data;
    } catch (error) {
      removeTokens();
      return rejectWithValue((error as FailedReqMsg).message);
    }
  }
);

export const fetchUserData = createAsyncThunk("user/getUserData", async () => {
  const response = await axiosSecureInstance.get<UserProfile>("/users/me");
  return response.data;
});

export const updateUserData = createAsyncThunk(
  "user/updateUserData",
  async (values: RequestUpdateUser, { rejectWithValue }) => {
    try {
      const response = await axiosSecureInstance.put("/users/me", values);
      return response.data;
    } catch (error) {
      return rejectWithValue((error as FailedReqMsg).message);
    }
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
      return rejectWithValue((error as FailedReqMsg).message);
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
    } catch (error) {
      return rejectWithValue((error as FailedReqMsg).message);
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
    } catch (error) {
      return rejectWithValue((error as FailedReqMsg).message);
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
    } catch (error) {
      return rejectWithValue((error as FailedReqMsg).message);
    }
  }
);

export const deleteUserAvatar = createAsyncThunk(
  "user/updateUserAvatar",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosSecureInstance.delete(`/users/me/avatar`);
      return response.data;
    } catch (error) {
      return rejectWithValue((error as FailedReqMsg).message);
    }
  }
);

const counterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.pending, (state, action) => {
      state.isProfileLoading = true;
    });
    builder.addCase(fetchUserData.rejected, (state, action) => {
      state.userProfile = null;
      state.isProfileLoading = false;
    });
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.userProfile = action.payload;
      state.isProfileLoading = false;
    });
  },
});

export const selectUserProfile = (state: RootState) => state.user.userProfile;
export const selectIsUserProfileFetching = (state: RootState) =>
  state.user.isProfileLoading;

export default counterSlice.reducer;
