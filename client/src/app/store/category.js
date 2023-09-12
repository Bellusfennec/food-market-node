import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoryService from "../services/category.service";

export const loadCategories = createAsyncThunk(
  "category/load",
  async (_, { rejectWithValue }) => {
    try {
      const { content } = await categoryService.getAll();
      return content;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createCategory = createAsyncThunk(
  "category/create",
  async (payload, { rejectWithValue }) => {
    try {
      const { content } = await categoryService.create(payload);
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

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: {
    [loadCategories.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [loadCategories.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.entities = payload;
    },
    [loadCategories.rejected]: (state) => {
      state.isLoading = false;
      state.error = null;
    },
    [createCategory.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [createCategory.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.entities = [...state.entities, payload];
    },
    [createCategory.rejected]: (state) => {
      state.isLoading = false;
      state.error = null;
    },
  },
});

const { actions, reducer: categoryReducer } = categorySlice;
const {} = actions;

export const getCategories = () => (state) => state.category.entities;
export const getCategoryById = (id) => (state) => {
  const { entities } = state.category;
  return entities ? entities.find((c) => c._id === id) : entities;
};
export const getCategoriesLoadingStatus = () => (state) =>
  state.category.isLoading;

export default categoryReducer;
