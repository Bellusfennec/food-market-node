import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import specificationService from "../services/specification.service";

export const loadSpecifications = createAsyncThunk(
  "specification/load",
  async (_, { rejectWithValue }) => {
    try {
      const { content } = await specificationService.getAll();
      return content;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createSpecification = createAsyncThunk(
  "specification/create",
  async (payload, { rejectWithValue }) => {
    try {
      const { content } = await specificationService.create(payload);
      return content;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  entities: [],
  isLoading: true,
  error: null,
};

const specificationSlice = createSlice({
  name: "specification",
  initialState,
  reducers: {},
  extraReducers: {
    [loadSpecifications.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [loadSpecifications.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.entities = payload;
    },
    [loadSpecifications.rejected]: (state) => {
      state.isLoading = false;
      state.error = null;
    },
    [createSpecification.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [createSpecification.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.entities = [...state.entities, payload];
    },
    [createSpecification.rejected]: (state) => {
      state.isLoading = false;
      state.error = null;
    },
  },
});

const { actions, reducer: specificationReducer } = specificationSlice;
const {} = actions;

export const getSpecifications = () => (state) => state.specification.entities;
export const getSpecificationsLoadingStatus = () => (state) =>
  state.specification.isLoading;

export default specificationReducer;
