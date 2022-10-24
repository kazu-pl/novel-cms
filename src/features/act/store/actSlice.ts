import {
  createSlice,
  createAsyncThunk,
  isAnyOf,
  PayloadAction,
} from "@reduxjs/toolkit";
import { axiosSecureInstance } from "common/axios";
import { RootState } from "common/store";
import { SortDirection } from "novel-ui/lib/Table";

import { CustomizedColumnFromStore } from "components/DynamicTable/CustomizeDynamicTable";

import {
  ActExtended,
  ActDictionary,
  FailedReqMsg,
  Act,
  ActsResponse,
  SuccessfulReqMsg,
  ActExtendedResponse,
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
  actsTableColumns: {
    initial: CustomizedColumnFromStore[]; // initial keys, when you change columns in table and hit "default" the table will be reset to initial columns
    current: CustomizedColumnFromStore[]; // just current state of columns in table
  };
}

/**
 * List of initially visible columns in table. They are the same columns you see in `allPossibleColumns` from `ActList.tsx`
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
    key: "scenes",
    isActive: true,
  },
  {
    key: "nextAct",
    isActive: true,
  },
  {
    key: "createdAt",
    isActive: true,
  },
  {
    key: "type",
    isActive: true,
  },
  {
    key: "actions",
    isActive: true,
  },
];

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
  actsTableColumns: {
    initial: initalActsTableColumns,
    current: initalActsTableColumns,
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

export const fetchSingleAct = createAsyncThunk(
  "act/fetchSingleAct",
  async (actId: string) => {
    const response = await axiosSecureInstance.get<ActExtendedResponse>(
      `/acts/${actId}`
    );
    return response.data;
  }
);

export const addNewAct = createAsyncThunk(
  "act/addNewAct",
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

export const updateAct = createAsyncThunk(
  "act/updateAct",
  async (act: ActExtended, { rejectWithValue }) => {
    try {
      const response = await axiosSecureInstance.post<SuccessfulReqMsg>(
        `/acts/${act._id}/edit`,
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
  reducers: {
    updateActsTableColumns(
      state,
      action: PayloadAction<CustomizedColumnFromStore[]>
    ) {
      state.actsTableColumns.current = action.payload;
    },
  },
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
    builder.addCase(fetchSingleAct.pending, (state) => {
      state.singleAct.isFetching = true;
    });

    builder.addCase(fetchSingleAct.fulfilled, (state, action) => {
      state.singleAct.data = action.payload.data;
    });
    builder.addCase(fetchSingleAct.rejected, (state) => {
      state.singleAct.data = null;
    });
    builder.addMatcher(
      isAnyOf(fetchSingleAct.rejected, fetchSingleAct.fulfilled),
      (state) => {
        state.singleAct.isFetching = false;
      }
    );
  },
});

export const { updateActsTableColumns } = actSlice.actions;

export const selectActDictionary = (state: RootState) =>
  state.act.actsDictionary.data;

export const selectActs = (state: RootState) => state.act.acts;
export const selectSingleAct = (state: RootState) => state.act.singleAct;

export const selectActsTableInitialColumns = (state: RootState) =>
  state.act.actsTableColumns.initial;
export const selectActsTableCurrentColumns = (state: RootState) =>
  state.act.actsTableColumns.current;

export default actSlice.reducer;
