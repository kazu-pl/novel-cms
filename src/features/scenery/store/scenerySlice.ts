import {
  createSlice,
  createAsyncThunk,
  isAnyOf,
  PayloadAction,
} from "@reduxjs/toolkit";
// import { createAction } from "@reduxjs/toolkit";
import { axiosSecureInstance } from "common/axios";
import { RootState } from "common/store";
import { SortDirection } from "novel-ui/lib/Table";
import {
  RequestScenery,
  FailedReqMsg,
  SuccessfulReqMsg,
  SceneriesResponse,
  Scenery,
  SingleSceneryResponse,
  SceneriesDictionary,
} from "types/novel-server.types";

import { CustomizedColumnFromStore } from "components/DynamicTable/CustomizeDynamicTable";

interface SceneryState {
  sceneries: {
    data: Scenery[];
    isFetching: boolean;
    totalItems: number;
  };
  singleScenery: {
    data: Scenery | null;
    isFetching: boolean;
  };
  sceneryDictionary: {
    data: SceneriesDictionary["data"] | null;
    isFetching: boolean;
  };
  sceneryTableColumns: {
    initial: CustomizedColumnFromStore[]; // initial keys, when you change columns in table and hit "default" the table will be reset to initial columns
    current: CustomizedColumnFromStore[]; // just current state of columns in table
  };
}

/**
 * List of initially visible columns in table. They are the same columns you see in `allPossibleColumns` from `SceneryList.tsx`
 */
const initalActsTableColumns: CustomizedColumnFromStore[] = [
  {
    key: "title",
    isActive: true,
  },
  {
    key: "description",
    isActive: true,
  },
  {
    key: "imagesList",
    isActive: true,
  },
  {
    key: "createdAt",
    isActive: true,
  },
  {
    key: "actions",
    isActive: true,
  },
];

const initialState: SceneryState = {
  sceneries: {
    data: [],
    isFetching: false,
    totalItems: 0,
  },
  singleScenery: {
    data: null,
    isFetching: false,
  },
  sceneryDictionary: {
    data: null,
    isFetching: false,
  },
  sceneryTableColumns: {
    initial: initalActsTableColumns,
    current: initalActsTableColumns,
  },
};

export const fetchSceneriesDictionary = createAsyncThunk(
  "scenery/fetchSceneriesDictionary",
  async () => {
    const response = await axiosSecureInstance.get<SceneriesDictionary>(
      `/scenery/dictionary`
    );
    return response.data;
  }
);

export const fetchSceneries = createAsyncThunk(
  "scenery/fetchSceneries",
  async ({
    sortBy,
    sortDirection,
    pageSize,
    currentPage,
    search,
  }: {
    sortBy: string;
    sortDirection: SortDirection;
    pageSize: number;
    currentPage: number;
    search: string;
  }) => {
    const response = await axiosSecureInstance.get<SceneriesResponse>(
      `/scenery`,
      {
        params: {
          sortBy,
          sortDirection,
          pageSize,
          currentPage,
          ...(!!search && { search }),
        },
      }
    );
    return response.data;
  }
);

export const fetchSingleScenery = createAsyncThunk(
  "scenery/fetchSingleScenery",
  async (sceneryId: string) => {
    const response = await axiosSecureInstance.get<SingleSceneryResponse>(
      `/scenery/${sceneryId}`
    );
    return response.data;
  }
);

export const addNewScenery = createAsyncThunk(
  "scenery/AddNewScenery",
  async (values: RequestScenery, { rejectWithValue }) => {
    try {
      const response = await axiosSecureInstance.post<SuccessfulReqMsg>(
        `/scenery/add`,
        values
      );
      return response.data;
    } catch (error) {
      return rejectWithValue((error as FailedReqMsg).message);
    }
  }
);

export const removeScenery = createAsyncThunk(
  "scenery/removeScenery",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosSecureInstance.delete<SuccessfulReqMsg>(
        `/scenery/${id}/delete`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue((error as FailedReqMsg).message);
    }
  }
);

export const updateSceneryBasicData = createAsyncThunk(
  "scenery/updateSceneryBasicData",
  async (
    { values, id }: { values: RequestScenery; id: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosSecureInstance.patch<SuccessfulReqMsg>(
        `/scenery/${id}/edit`,
        values
      );
      return response.data;
    } catch (error) {
      return rejectWithValue((error as FailedReqMsg).message);
    }
  }
);

export const addSceneryImages = createAsyncThunk(
  "scenery/addSceneryImages",
  async (
    { values, id }: { values: FormData; id: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosSecureInstance.post<SuccessfulReqMsg>(
        `/scenery/${id}/images`,
        values
      );
      return response.data;
    } catch (error) {
      return rejectWithValue((error as FailedReqMsg).message);
    }
  }
);

export const deleteSceneryImage = createAsyncThunk(
  "scenery/deleteSceneryImage",
  async (
    { imageFilename, sceneryId }: { imageFilename: string; sceneryId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosSecureInstance.delete<SuccessfulReqMsg>(
        `/scenery/${sceneryId}/image/${imageFilename}/delete`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue((error as FailedReqMsg).message);
    }
  }
);

//// if action is not async, you can also create an action like below instead of function in "reducers" property of slice:
// export const removeSingleSceneryData = createAction(
//   "scenery/removeSingleSceneryData"
// );

const scenerySlice = createSlice({
  name: "scenery",
  initialState,
  reducers: {
    resetSingleSceneryData(state) {
      state.singleScenery = {
        isFetching: state.singleScenery.isFetching,
        data: null,
      };
    },
    resetSceneryDictionaryData(state) {
      state.sceneryDictionary = {
        isFetching: state.singleScenery.isFetching,
        data: null,
      };
    },
    updateSceneryTableColumns(
      state,
      action: PayloadAction<CustomizedColumnFromStore[]>
    ) {
      state.sceneryTableColumns.current = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSceneries.pending, (state) => {
      state.sceneries.isFetching = true;
    });
    builder.addCase(fetchSceneries.fulfilled, (state, action) => {
      state.sceneries.data = action.payload.data;
      state.sceneries.totalItems = action.payload.totalItems;
      state.sceneries.isFetching = false;
    });
    builder.addCase(fetchSceneries.rejected, (state) => {
      state.sceneries.isFetching = false;
    });
    builder.addCase(fetchSingleScenery.pending, (state) => {
      state.singleScenery.isFetching = true;
    });
    builder.addCase(fetchSingleScenery.fulfilled, (state, action) => {
      state.singleScenery.data = action.payload.data;
      state.singleScenery.isFetching = false;
    });
    builder.addCase(fetchSingleScenery.rejected, (state) => {
      state.singleScenery.isFetching = false;
    });
    builder.addCase(fetchSceneriesDictionary.pending, (state) => {
      state.sceneryDictionary.isFetching = true;
    });
    builder.addCase(fetchSceneriesDictionary.fulfilled, (state, action) => {
      state.sceneryDictionary.data = action.payload.data;
    });
    builder.addMatcher(
      isAnyOf(
        fetchSceneriesDictionary.rejected,
        fetchSceneriesDictionary.fulfilled
      ),
      (state) => {
        state.sceneryDictionary.isFetching = false;
      }
    );

    // builder.addCase(removeSingleSceneryData, (state) => {
    //   state.singleScenery.data = null;
    // });
  },
});

export const { updateSceneryTableColumns } = scenerySlice.actions;

export const selectSceneryTableInitialColumns = (state: RootState) =>
  state.scenery.sceneryTableColumns.initial;
export const selectSceneryTableCurrentColumns = (state: RootState) =>
  state.scenery.sceneryTableColumns.current;

export const selectSceneries = (state: RootState) => state.scenery.sceneries;
export const selectSingleScenery = (state: RootState) =>
  state.scenery.singleScenery;
export const selectSingleSceneryData = (state: RootState) =>
  state.scenery.singleScenery.data;

export const selectSceneriesDictionary = (state: RootState) =>
  state.scenery.sceneryDictionary;

export const { resetSingleSceneryData, resetSceneryDictionaryData } =
  scenerySlice.actions;

export default scenerySlice.reducer;
