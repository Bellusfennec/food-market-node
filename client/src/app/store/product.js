import { createSlice } from "@reduxjs/toolkit";
import productService from "../services/product.service";

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
    created(state, action) {
      state.entities = [...state.entities, action.payload];
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
  },
});
const { actions, reducer: productReducer } = productSlice;
const { productRecived, requested, created, requestFailed, updated, removed } =
  actions;

export const loadProducts = () => async (dispatch) => {
  dispatch(requested());
  try {
    const { content } = await productService.getAll();
    dispatch(productRecived(content));
  } catch (error) {
    console.log(error);
    dispatch(requestFailed(error.message));
  }
};

export const createdProduct = (payload) => async (dispatch) => {
  dispatch(requested());
  try {
    const { content } = await productService.create(payload);
    dispatch(created(content));
  } catch (error) {
    dispatch(requestFailed(error.message));
  }
};

export const removedProduct = (id) => async (dispatch, getState) => {
  const { entities } = getState().product;
  dispatch(requested());
  try {
    // const item = entities.find((p) => p._id === id);
    // await dispatch(removedCharacteristics(item));
    await productService.delete(id);
    dispatch(removed(id));
  } catch (error) {
    dispatch(requestFailed(error.message));
  }
};

export const updatedProduct = (payload) => async (dispatch) => {
  dispatch(requested());
  try {
    const { content } = await productService.update(payload);
    dispatch(updated(content));
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
