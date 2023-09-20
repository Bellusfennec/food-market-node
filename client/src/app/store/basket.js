import { createSlice } from "@reduxjs/toolkit";
import basketService from "../services/basket.service";

export const loadBasket = () => (dispatch) => {
  dispatch(pending());
  try {
    const basket = basketService.get();
    const itemsList = basket ? basket : [];
    dispatch(fulfilled(itemsList));
  } catch (error) {
    dispatch(rejected(error));
  }
};

export const addToBasket = (productId) => (dispatch, getState) => {
  dispatch(pending());
  try {
    const { entities } = getState().basket;
    const item = { productId, productCount: 1 };
    const itemsList = [...entities, item];
    basketService.set(itemsList);
    dispatch(fulfilled(itemsList));
  } catch (error) {
    dispatch(rejected(error));
  }
};

export const increaseInBasket = (productId) => (dispatch, getState) => {
  dispatch(pending());
  try {
    const { entities } = getState().basket;
    const itemsList = [...entities];
    const index = itemsList.findIndex((el) => el.productId === productId);
    itemsList[index] = {
      ...itemsList[index],
      productCount: itemsList[index].productCount + 1,
    };
    basketService.set(itemsList);
    dispatch(fulfilled(itemsList));
  } catch (error) {
    dispatch(rejected(error));
  }
};

export const decreaseInBasket = (productId) => (dispatch, getState) => {
  dispatch(pending());
  try {
    const { entities } = getState().basket;
    let itemsList = [...entities];
    const index = itemsList.findIndex((el) => el.productId === productId);
    itemsList[index] = {
      ...itemsList[index],
      productCount: itemsList[index].productCount - 1,
    };
    if (itemsList[index].productCount === 0) {
      itemsList = itemsList.filter((f) => f.productId !== productId);
      console.log(itemsList);
    }
    itemsList.length === 0
      ? basketService.delete()
      : basketService.set(itemsList);
    dispatch(fulfilled(itemsList));
  } catch (error) {
    dispatch(rejected(error));
  }
};

export const deleteBasket = () => (dispatch) => {
  dispatch(pending());
  try {
    basketService.delete();
    dispatch(fulfilled([]));
  } catch (error) {
    dispatch(rejected(error));
  }
};

const initialState = {
  entities: [],
  isLoading: true,
  error: null,
};

const basketSlice = createSlice({
  name: "basket",
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

const { actions, reducer: basketReducer } = basketSlice;
const { pending, fulfilled, rejected } = actions;

export const getBasket = () => (state) => state.basket.entities;
export const getBasketById = (id) => (state) => {
  const { entities } = state.basket;
  return entities ? entities.find((c) => c.productId === id) : entities;
};
export const getBasketCount = () => (state) => {
  const basket = state.basket.entities;
  if (!basket) return 0;
  return basket?.length;
};
export const getBasketSum = () => (state) => {
  const basket = state.basket.entities;
  const product = state.product.entities;
  let sum = 0;
  if (basket.length === 0 || product.length === 0) return sum;
  basket.forEach((m) => {
    const { productId, productCount } = m;
    const item = product.find((f) => f._id === productId);
    const { price, priceSale } = item;
    if (priceSale) {
      sum += priceSale * productCount;
    } else {
      sum += price * productCount;
    }
  });
  return sum;
};
export const getBasketLoadingStatus = () => (state) => state.basket.isLoading;

export default basketReducer;
