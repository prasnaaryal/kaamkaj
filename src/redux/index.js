import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./userSlice";
import categorySliceReducer from "./categorySlice";
import jobSliceReducer from "./jobSlice";
//stores value in datafield
export const store = configureStore({
  reducer: {
    user: userSliceReducer,
    job: jobSliceReducer,
    category: categorySliceReducer,
    // order: orderSliceReducer,
  },
});
