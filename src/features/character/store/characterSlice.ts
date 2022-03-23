import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createAction } from "@reduxjs/toolkit";
import { axiosSecureInstance } from "common/axios";
import { RootState } from "common/store/store";
import { SortDirection } from "novel-ui/lib/Table";
import {
  RequestScenery,
  FailedReqMsg,
  SuccessfulReqMsg,
  CharactersResponse,
  Character,
  SingleCharacterResponse,
  CharactersDictionary,
} from "types/novel-server.types";

interface CharacterState {
  characters: {
    data: Character[];
    isFetching: boolean;
    totalItems: number;
  };
  singleCharacter: {
    data: Character | null;
    isFetching: boolean;
  };
  characterDictionary: {
    data: CharactersDictionary["data"] | null;
    isFetching: boolean;
  };
}

const initialState: CharacterState = {
  characters: {
    data: [],
    isFetching: false,
    totalItems: 0,
  },
  singleCharacter: {
    data: null,
    isFetching: false,
  },
  characterDictionary: {
    data: null,
    isFetching: false,
  },
};

export const fetchCharactersDictionary = createAsyncThunk(
  "character/fetchCharactersDictionary",
  async () => {
    const response = await axiosSecureInstance.get<CharactersDictionary>(
      `/characters/dictionary`
    );
    return response.data;
  }
);

export const fetchCharacters = createAsyncThunk(
  "character/fetchCharacters",
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
    const response = await axiosSecureInstance.get<CharactersResponse>(
      `/characters`,
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

export const fetchSingleCharacter = createAsyncThunk(
  "character/fetchSingleCharacter",
  async (characterId: string) => {
    const response = await axiosSecureInstance.get<SingleCharacterResponse>(
      `/characters/${characterId}`
    );
    return response.data;
  }
);

export const addNewCharacter = createAsyncThunk(
  "character/addNewCharacter",
  async (values: RequestScenery, { rejectWithValue }) => {
    try {
      const response = await axiosSecureInstance.post<SuccessfulReqMsg>(
        `/characters/add`,
        values
      );
      return response.data;
    } catch (error) {
      return rejectWithValue((error as FailedReqMsg).message);
    }
  }
);

export const removeCharacter = createAsyncThunk(
  "character/removeCharacter",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosSecureInstance.delete<SuccessfulReqMsg>(
        `/characters/${id}/delete`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue((error as FailedReqMsg).message);
    }
  }
);

export const updateCharacterBasicData = createAsyncThunk(
  "character/updateCharacterBasicData",
  async (
    { values, id }: { values: RequestScenery; id: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosSecureInstance.patch<SuccessfulReqMsg>(
        `/characters/${id}/edit`,
        values
      );
      return response.data;
    } catch (error) {
      return rejectWithValue((error as FailedReqMsg).message);
    }
  }
);

export const addCharacterImages = createAsyncThunk(
  "character/addCharacterImages",
  async (
    { values, id }: { values: FormData; id: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosSecureInstance.post<SuccessfulReqMsg>(
        `/characters/${id}/images`,
        values
      );
      return response.data;
    } catch (error) {
      return rejectWithValue((error as FailedReqMsg).message);
    }
  }
);

export const deleteCharacterImage = createAsyncThunk(
  "character/deleteCharacterImage",
  async (
    {
      imageFilename,
      characterId,
    }: { imageFilename: string; characterId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosSecureInstance.delete<SuccessfulReqMsg>(
        `/characters/${characterId}/image/${imageFilename}/delete`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue((error as FailedReqMsg).message);
    }
  }
);

export const resetSingleCharacterData = createAction(
  "character/resetSingleCharacterData"
);

const characterSlice = createSlice({
  name: "character",
  initialState,
  reducers: {
    resetSingleCharacterData(state) {
      state.singleCharacter = {
        isFetching: state.singleCharacter.isFetching,
        data: null,
      };
    },
    resetSceneryDictionaryData(state) {
      state.characterDictionary = {
        isFetching: state.characterDictionary.isFetching,
        data: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCharacters.pending, (state) => {
      state.characters.isFetching = true;
    });
    builder.addCase(fetchCharacters.fulfilled, (state, action) => {
      state.characters.data = action.payload.data;
      state.characters.totalItems = action.payload.totalItems;
      state.characters.isFetching = false;
    });
    builder.addCase(fetchCharacters.rejected, (state) => {
      state.characters.isFetching = false;
    });
    builder.addCase(fetchSingleCharacter.pending, (state) => {
      state.singleCharacter.isFetching = true;
    });
    builder.addCase(fetchSingleCharacter.fulfilled, (state, action) => {
      state.singleCharacter.data = action.payload.data;
      state.singleCharacter.isFetching = false;
    });
    builder.addCase(fetchSingleCharacter.rejected, (state) => {
      state.singleCharacter.isFetching = false;
    });
    builder.addCase(resetSingleCharacterData, (state) => {
      state.singleCharacter.data = null;
    });
    builder.addCase(fetchCharactersDictionary.pending, (state) => {
      state.characterDictionary.isFetching = true;
    });
    builder.addCase(fetchCharactersDictionary.fulfilled, (state, action) => {
      state.characterDictionary.isFetching = false;
      state.characterDictionary.data = action.payload.data;
    });
    builder.addCase(fetchCharactersDictionary.rejected, (state) => {
      state.characterDictionary.isFetching = false;
      state.characterDictionary.data = null;
    });
  },
});

export const selectCharacters = (state: RootState) =>
  state.character.characters;
export const selectSingleCharacter = (state: RootState) =>
  state.character.singleCharacter;
export const selectSingleCharacterData = (state: RootState) =>
  state.character.singleCharacter.data;

export const selectCharactersDictionary = (state: RootState) =>
  state.character.characterDictionary;

export const { resetSceneryDictionaryData } = characterSlice.actions;

export default characterSlice.reducer;
