import { createSlice } from "@reduxjs/toolkit";
import favoriteService from "../services/favorite.service";

export const addFavorite = (productId) => (dispatch, getState) => {
  dispatch(pending());
  try {
    const { entities } = getState().favorite;
    const itemsList = [...entities, productId];
    favoriteService.set(itemsList);
    dispatch(fulfilled(itemsList));
  } catch (error) {
    dispatch(rejected(error));
  }
};

export const deleteFavorite = (productId) => (dispatch, getState) => {
  dispatch(pending());
  try {
    const { entities } = getState().favorite;
    const itemsList = entities.filter((f) => f !== productId);
    favoriteService.set(itemsList);
    dispatch(fulfilled(itemsList));
  } catch (error) {
    dispatch(rejected(error));
  }
};

const favorite = favoriteService.get();
const entities = favorite ? favorite : [];
const initialState = {
  entities,
  isLoading: true,
  error: null,
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    pending: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fulfilled: (state, { payload }) => {
      state.isLoading = false;
      state.entities = payload;
    },
    rejected: (state) => {
      state.isLoading = false;
      state.error = null;
    },
  },
});

const { actions, reducer: favoriteReducer } = favoriteSlice;
const { pending, fulfilled, rejected } = actions;

export const getFavorite = () => (state) => state.favorite.entities;
export const getFavoriteById = (id) => (state) => {
  const { entities } = state.favorite;
  return entities ? entities.find((c) => c === id) : entities;
};
export const getFavoriteLoadingStatus = () => (state) =>
  state.favorite.isLoading;

export default favoriteReducer;
