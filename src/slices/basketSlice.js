import { createSlice } from "@reduxjs/toolkit";

//This file contains details (wrapped in a "slice") about items to add onto the global redux store. A "slice" in this case, basketSlice will contain info about the items we add onto the cart
const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    //Actions - these are functions that act as getters and setters for the information in inside the "slice". Actions have state - which is the current state of the slice, and payload contains the product passed in when the user add an item into the cart in Product.js file
    //addToBasket - appends the product sent via addItemToBasket() function (in Product.js) to the state.items array. Note the Product is passed through as the action payload
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action) => {
      //Find the index of the item in the items array (we get through the state) depending on the id passed when this method was called. The id is passed via the action.payload
      const index = state.items.findIndex(
        (basketItem) => basketItem.id === action.payload.id
      );

      //Make a copy of the basket items
      let newBasket = [...state.items];

      if (index >= 0) {
        //The item was found in the basket, so remove it
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Can't remove the item with id: ${action.payload.id} as it is not in the basket`
        );
      }

      //Update the state.item to the new updated items (newBasket)
      state.items = newBasket;
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice, so in this case, the function accesses the state and taps into the state to access the basket and then the items inside that basket. This structure is shown in the "initialState" variable defined at the top of this file
export const selectItems = (state) => state.basket.items;

//Another selector to have access to the total price of all the items to be checked out
export const selectTotal = (state) =>
  state.basket.items.reduce((total, item) => total + item.price, 0);

export default basketSlice.reducer;
