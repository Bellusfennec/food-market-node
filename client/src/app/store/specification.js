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

export const updateSpecification = createAsyncThunk(
  "specification/update",
  async (payload, { rejectWithValue }) => {
    try {
      const { content } = await specificationService.update(payload);
      return content;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteSpecification = createAsyncThunk(
  "specification/delete",
  async (id, { rejectWithValue }) => {
    try {
      await specificationService.delete(id);
      return id;
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
    [updateSpecification.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [updateSpecification.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      const index = state.entities.findIndex((el) => el._id === payload._id);
      state.entities[index] = { ...state.entities[index], ...payload };
    },
    [updateSpecification.rejected]: (state) => {
      state.isLoading = false;
      state.error = null;
    },
    [deleteSpecification.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [deleteSpecification.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.entities = state.entities.filter((f) => f._id !== payload);
    },
    [createSpecification.rejected]: (state) => {
      state.isLoading = false;
      state.error = null;
    },
  },
});

const { reducer: specificationReducer } = specificationSlice;
// const {} = actions;

export const getSpecifications = () => (state) => state.specification.entities;
export const getSpecificationById = (id) => (state) => {
  const { entities } = state.specification;
  return entities ? entities.find((c) => c._id === id) : entities;
};
export const getSpecificationsLoadingStatus = () => (state) =>
  state.specification.isLoading;

export default specificationReducer;
