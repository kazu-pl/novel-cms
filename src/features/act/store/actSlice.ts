import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosSecureInstance } from "common/axios";
import { RootState } from "common/store/store";

import {
  ActExtended,
  ActDictionary,
  FailedReqMsg,
  Act,
} from "types/novel-server.types";

interface CharacterState {
  acts: {
    data: ActExtended[];
    isFetching: boolean;
    totalItems: number;
  };
  singleAct: {
    data: ActExtended | null;
    isFetching: boolean;
  };
  actsDictionary: {
    data: ActDictionary["data"] | null;
    isFetching: boolean;
  };
}

const initialState: CharacterState = {
  acts: {
    data: [],
    isFetching: false,
    totalItems: 0,
  },
  singleAct: {
    data: null,
    isFetching: false,
  },
  actsDictionary: {
    data: null,
    isFetching: false,
  },
};

export const fetchActsDictionary = createAsyncThunk(
  "act/fetchActsDictionary",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosSecureInstance.get<ActDictionary>(
        `/acts/dictionary`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue((error as FailedReqMsg).message);
    }
  }
);

export const postActs = createAsyncThunk(
  "act/postActs",
  async (act: Act, { rejectWithValue }) => {
    try {
      const response = await axiosSecureInstance.post<ActDictionary>(
        `/acts/add`,
        act
      );
      return response.data;
    } catch (error) {
      return rejectWithValue((error as FailedReqMsg).message);
    }
  }
);

const actSlice = createSlice({
  name: "act",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchActsDictionary.pending, (state, action) => {
      state.actsDictionary.isFetching = true;
    });
    builder.addCase(fetchActsDictionary.rejected, (state, action) => {
      state.actsDictionary.isFetching = false;
      state.actsDictionary.data = null;
    });
    builder.addCase(fetchActsDictionary.fulfilled, (state, action) => {
      state.actsDictionary.isFetching = false;
      state.actsDictionary.data = (
        action.payload as unknown as ActDictionary
      ).data;
    });
  },
});

export const selectActDictionary = (state: RootState) =>
  state.act.actsDictionary.data;

export default actSlice.reducer;
