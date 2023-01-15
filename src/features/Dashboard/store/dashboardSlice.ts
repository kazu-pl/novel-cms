import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosSecureInstance } from "common/axios";
import { RootState } from "common/store";
import {
  ImagesCountResponse,
  FailedReqMsg,
  ScenesCountResponse,
  DialogsCountResponse,
} from "types/novel-server.types";

interface DashbaordState {
  charactersImagesCount: {
    data: ImagesCountResponse["data"] | null;
    isFetching: boolean;
    error: string | null;
  };
  sceneryImagesCount: {
    data: ImagesCountResponse["data"] | null;
    isFetching: boolean;
    error: string | null;
  };
  actsScenesCunt: {
    data: ScenesCountResponse["data"] | null;
    isFetching: boolean;
    error: string | null;
  };
  actsDialogsCunt: {
    data: DialogsCountResponse["data"] | null;
    isFetching: boolean;
    error: string | null;
  };
}

const initialState: DashbaordState = {
  charactersImagesCount: {
    data: null,
    isFetching: true,
    error: null,
  },
  sceneryImagesCount: {
    data: null,
    isFetching: true,
    error: null,
  },
  actsScenesCunt: {
    data: null,
    isFetching: true,
    error: null,
  },
  actsDialogsCunt: {
    data: null,
    isFetching: true,
    error: null,
  },
};

export const fetchCharactersImagesCount = createAsyncThunk(
  "dashboard/fetchCharactersImagesCount",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosSecureInstance.get<ImagesCountResponse>(
        `/characters/images-count`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue((error as FailedReqMsg).message);
    }
  }
);

export const fetchSceneriesImagesCount = createAsyncThunk(
  "dashboard/fetchSceneriesImagesCount",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosSecureInstance.get<ImagesCountResponse>(
        `/scenery/images-count`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue((error as FailedReqMsg).message);
    }
  }
);

export const fetchActsScenesCount = createAsyncThunk(
  "dashboard/fetchActsScenesCount",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosSecureInstance.get<ScenesCountResponse>(
        `/acts/scenes-list`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue((error as FailedReqMsg).message);
    }
  }
);

export const fetchActsDialogsCount = createAsyncThunk(
  "dashboard/fetchActsDialogsCount",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosSecureInstance.get<DialogsCountResponse>(
        `/acts/dialogs-list`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue((error as FailedReqMsg).message);
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCharactersImagesCount.pending, (state) => {
      state.charactersImagesCount.isFetching = true;
      state.charactersImagesCount.error = null;
    });
    builder.addCase(fetchCharactersImagesCount.fulfilled, (state, action) => {
      state.charactersImagesCount.data = action.payload.data;
      state.charactersImagesCount.isFetching = false;
    });
    builder.addCase(fetchCharactersImagesCount.rejected, (state, action) => {
      state.charactersImagesCount.isFetching = false;
      state.charactersImagesCount.error = action.payload as string;
    });
    builder.addCase(fetchSceneriesImagesCount.pending, (state) => {
      state.sceneryImagesCount.isFetching = true;
      state.sceneryImagesCount.error = null;
    });
    builder.addCase(fetchSceneriesImagesCount.fulfilled, (state, action) => {
      state.sceneryImagesCount.data = action.payload.data;
      state.sceneryImagesCount.isFetching = false;
    });
    builder.addCase(fetchSceneriesImagesCount.rejected, (state, action) => {
      state.sceneryImagesCount.isFetching = false;
      state.sceneryImagesCount.error = action.payload as string;
    });
    builder.addCase(fetchActsScenesCount.pending, (state) => {
      state.actsScenesCunt.isFetching = true;
      state.actsScenesCunt.error = null;
    });
    builder.addCase(fetchActsScenesCount.fulfilled, (state, action) => {
      state.actsScenesCunt.data = action.payload.data;
      state.actsScenesCunt.isFetching = false;
    });
    builder.addCase(fetchActsScenesCount.rejected, (state, action) => {
      state.actsScenesCunt.isFetching = false;
      state.actsScenesCunt.error = action.payload as string;
    });
    builder.addCase(fetchActsDialogsCount.pending, (state) => {
      state.actsDialogsCunt.isFetching = true;
      state.actsDialogsCunt.error = null;
    });
    builder.addCase(fetchActsDialogsCount.fulfilled, (state, action) => {
      state.actsDialogsCunt.data = action.payload.data;
      state.actsDialogsCunt.isFetching = false;
    });
    builder.addCase(fetchActsDialogsCount.rejected, (state, action) => {
      state.actsDialogsCunt.isFetching = false;
      state.actsDialogsCunt.error = action.payload as string;
    });
  },
});

export const selectCharactersImagesCount = (state: RootState) =>
  state.dashbard.charactersImagesCount;
export const selectSceneriesImagesCount = (state: RootState) =>
  state.dashbard.sceneryImagesCount;
export const selectActScenesCount = (state: RootState) =>
  state.dashbard.actsScenesCunt;
export const selectActDialogsCount = (state: RootState) =>
  state.dashbard.actsDialogsCunt;

export default dashboardSlice.reducer;
