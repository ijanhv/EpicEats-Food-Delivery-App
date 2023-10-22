import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for your state
interface BasketState {
  items: { id: string; price: number, title: string, description: string, imgUrl: string}[];
}

// Define the initial state using that type
const initialState: BasketState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action: PayloadAction<{ id: string; price: number, title: string, description: string, imgUrl: string}>) => {
      state.items = [...state.items, action.payload];
    },
    emptyBasket: (state) => {
      state.items = [];
    },
    removeFromBasket: (state, action: PayloadAction<{ id: string }>) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id);

      let newBasket = [...state.items];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(`Can't remove product (id: ${action.payload.id}) as it's not in the basket!`);
      }

      state.items = newBasket;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToBasket, removeFromBasket, emptyBasket } = basketSlice.actions;

export const selectBasketItems = (state: { basket: BasketState }) => state.basket.items;

export const selectBasketItemsWithId = (state: { basket: BasketState }, id: string) =>
  state.basket.items.filter((item) => item.id === id);

export const selectBasketTotal = (state: { basket: BasketState }) =>
  state.basket.items.reduce((total, item) => (total += item.price), 0);

export default basketSlice.reducer;
