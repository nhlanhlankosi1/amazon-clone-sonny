import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "../slices/basketSlice";

//THE GLOBAL STORE TO STORE VARIABLES TO BE USED THROUGHOUT THE APP. Inside the reducer, we pass through we specify the pieces of information we need to store inside this store. We are starting with a basket which will contain the contain items from the basketSlice 
export const store = configureStore({
  reducer: {
    basket: basketReducer,
  },
});
