import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import basketService from "../services/basket.service";

// export const loadBasket = createAsyncThunk(
//   "basket/load",
//   async (_, { rejectWithValue }) => {
//     try {
//       const { content } = await basketService.getAll();
//       return content;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

export const addToBasket = createAsyncThunk(
  "basket/create",
  async (payload, { rejectWithValue }) => {
    try {
      // const { content } = await basketService.create(payload);
      // return content;
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

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {},
  extraReducers: {
    [addToBasket.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [addToBasket.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.entities = payload;
    },
    [addToBasket.rejected]: (state) => {
      state.isLoading = false;
      state.error = null;
    },
  },
});

const { actions, reducer: basketReducer } = basketSlice;
const {} = actions;

// export const getBaskets = () => (state) => state.basket.entities;
// export const getBasketById = (id) => (state) => {
//   const { entities } = state.basket;
//   return entities ? entities.find((c) => c._id === id) : entities;
// };
// export const getBasketsLoadingStatus = () => (state) =>
//   state.basket.isLoading;

export default basketReducer;
