import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productService from "../services/product.service";

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (payload, { rejectWithValue }) => {
    try {
      const data = { ...payload };
      const formData = new FormData();
      for (const key in data) {
        if (key === "characteristics") {
          formData.append(`${key}`, JSON.stringify(payload[key]));
        } else {
          formData.append(`${key}`, payload[key]);
        }
      }
      const { content } = await productService.create(formData);
      return content;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (payload, { rejectWithValue }) => {
    try {
      const data = { ...payload };
      const formData = new FormData();
      for (const key in data) {
        if (key === "characteristics") {
          formData.append(`${key}`, JSON.stringify(payload[key]));
        } else {
          formData.append(`${key}`, payload[key]);
        }
      }
      const { content } = await productService.update(payload._id, formData);
      return content;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  entities: [],
  isLoading: true,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    requested(state) {
      state.isLoading = true;
    },
    productRecived(state, action) {
      state.entities = action.payload;
      state.isLoading = false;
    },
    requestFailed(state) {
      state.isLoading = false;
    },
    removed(state, action) {
      state.entities = state.entities.filter((el) => el._id !== action.payload);
      state.isLoading = false;
    },
  },
  extraReducers: {
    [createProduct.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [createProduct.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.entities = [...state.entities, payload];
    },
    [createProduct.rejected]: (state) => {
      state.isLoading = false;
      state.error = null;
    },
    [updateProduct.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [updateProduct.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      const index = state.entities.findIndex((el) => el._id === payload._id);
      state.entities[index] = { ...state.entities[index], ...payload };
    },
    [updateProduct.rejected]: (state) => {
      state.isLoading = false;
      state.error = null;
    },
  },
});
const { actions, reducer: productReducer } = productSlice;
const { productRecived, requested, requestFailed, removed } = actions;

export const loadProducts = () => async (dispatch) => {
  dispatch(requested());
  try {
    const { content } = await productService.getAll();
    dispatch(productRecived(content));
  } catch (error) {
    dispatch(requestFailed(error.message));
  }
};

export const removedProduct = (id) => async (dispatch, getState) => {
  dispatch(requested());
  try {
    await productService.delete(id);
    dispatch(removed(id));
  } catch (error) {
    dispatch(requestFailed(error.message));
  }
};

export function removeProduct(id) {
  return removed({ id });
}

export const getProductById = (id) => (state) => {
  if (state.product.entities) {
    return state.product.entities.find((p) => p._id === id);
  }
};
export const getProducts = () => (state) => state.product.entities;
export const getProductsLoadingStatus = () => (state) =>
  state.product.isLoading;

export default productReducer;
