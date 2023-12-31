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

export const updateCategory = createAsyncThunk(
  "category/update",
  async (payload, { rejectWithValue }) => {
    try {
      const { content } = await categoryService.update(payload);
      return content;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "category/delete",
  async (id, { rejectWithValue }) => {
    try {
      await categoryService.delete(id);
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
    [updateCategory.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [updateCategory.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      const index = state.entities.findIndex((el) => el._id === payload._id);
      state.entities[index] = { ...state.entities[index], ...payload };
    },
    [updateCategory.rejected]: (state) => {
      state.isLoading = false;
      state.error = null;
    },
    [deleteCategory.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [deleteCategory.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.entities = state.entities.filter((f) => f._id !== payload);
    },
    [createCategory.rejected]: (state) => {
      state.isLoading = false;
      state.error = null;
    },
  },
});

const { reducer: categoryReducer } = categorySlice;
// const {} = actions;

export const getCategories = () => (state) => state.category.entities;
export const getCategoryById = (id) => (state) => {
  const { entities } = state.category;
  return entities ? entities.find((c) => c._id === id) : entities;
};
export const getCategoriesLoadingStatus = () => (state) =>
  state.category.isLoading;

export default categoryReducer;
