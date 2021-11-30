import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosSecureInstance } from "common/axios";
import { RootState } from "common/store/store";
import { SortDirection } from "novel-ui/lib/Table";

import {
  ActExtended,
  ActDictionary,
  FailedReqMsg,
  Act,
  ActsResponse,
  SuccessfulReqMsg,
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

export const fetchActs = createAsyncThunk(
  "act/fetchActs",
  async ({
    sortBy,
    sortDirection,
    pageSize,
    currentPage,
  }: {
    sortBy: string;
    sortDirection: SortDirection;
    pageSize: number;
    currentPage: number;
  }) => {
    const response = await axiosSecureInstance.get<ActsResponse>(`/acts`, {
      params: {
        sortBy,
        sortDirection,
        pageSize,
        currentPage,
      },
    });
    return response.data;
  }
);

export const removeAct = createAsyncThunk(
  "act/removeAct",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosSecureInstance.delete<SuccessfulReqMsg>(
        `/acts/${id}/delete`
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
    builder.addCase(fetchActs.pending, (state) => {
      state.acts.isFetching = true;
    });
    builder.addCase(fetchActs.fulfilled, (state, action) => {
      state.acts.data = action.payload.data;
      state.acts.totalItems = action.payload.totalItems;
      state.acts.isFetching = false;
    });
    builder.addCase(fetchActs.rejected, (state) => {
      state.acts.isFetching = false;
    });
  },
});

export const selectActDictionary = (state: RootState) =>
  state.act.actsDictionary.data;

export const selectActs = (state: RootState) => state.act.acts;

export default actSlice.reducer;
