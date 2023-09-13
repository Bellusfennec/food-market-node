import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import characteristicService from "../services/characteristic.service";

export const getCharacteristics = createAsyncThunk(
  "characteristic/getCharacteristics",
  async (productsSpecifications, { rejectWithValue }) => {
    try {
      const { content } = await characteristicService.getAllByProduct(
        productsSpecifications
      );
      return content;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  entities: [],
  isLoading: true,
  error: null,
};

const characteristicSlice = createSlice({
  name: "characteristic",
  initialState,
  reducers: {
    recived(state, action) {
      const entities = state.entities.filter(
        (el) => el._id !== action.payload._id
      );
      state.entities = [...entities, action.payload];
    },
    created(state, action) {
      const entities = state.entities.filter(
        (el) => el._id !== action.payload._id
      );
      state.entities = [...entities, action.payload];
      state.isLoading = false;
    },
    updated(state, action) {
      const elementIndex = state.entities.findIndex(
        (el) => el._id === action.payload._id
      );
      state.entities[elementIndex] = {
        ...state.entities[elementIndex],
        ...action.payload,
      };
      state.isLoading = false;
    },
    removed(state, action) {
      state.entities = state.entities.filter((el) => el._id !== action.payload);
      state.isLoading = false;
    },
    requested(state) {
      state.isLoading = true;
      state.error = null;
    },
    requestFailed(state, { payload }) {
      state.isLoading = false;
      state.error = payload;
    },
  },
  extraReducers: {
    [getCharacteristics.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [getCharacteristics.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      const entities = state.entities.filter((el) => el._id !== payload._id);
      state.entities = [...entities, payload];
    },
    [getCharacteristics.rejected]: (state) => {
      state.isLoading = false;
      state.error = null;
    },
  },
});

const { actions, reducer: characteristicReducer } = characteristicSlice;
const { recived, created, removed, updated, requested, requestFailed } =
  actions;

export const getCharacteristicById = (id) => (state) => {
  const { entities } = state.characteristic;
  return entities ? entities.find((c) => c._id === id) : entities;
};
export const getCharacteristicsLoadingStatus = () => (state) =>
  state.characteristic.isLoading;

export default characteristicReducer;
