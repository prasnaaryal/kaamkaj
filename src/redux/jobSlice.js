import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const deleteJobById = createAsyncThunk(
  "job/deleteJobById",
  async (jobId, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/job/${jobId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to delete job");
      toast.success("Job deleted successfully");
      return jobId;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  //creating an array
  jobList: [],
  cartItem: [],
  wishList: [],
};
export const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    setDataJob: (state, action) => {
      // console.log(action)
      state.jobList = [...action.payload];
    },
    addCartItem: (state, action) => {
      const check = state.cartItem.some((el) => el._id === action.payload._id);
      if (check) {
        toast("Already Item in Cart");
      } else {
        toast("Item Add successfully");
        //   console.log(action);
        const total = action.payload.price;
        state.cartItem = [
          ...state.cartItem,
          { ...action.payload, qty: 1, total: total },
        ];
      }
    },
    deleteCartItem: (state, action) => {
      console.log(action.payload);
      toast("one item deleted");
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      state.cartItem.splice(index, 1);
    },
    addWishList: (state, action) => {
      const check = state.wishList.some((el) => el._id === action.payload._id);
      console.log("action", action);
      if (check) {
        toast("Already Item in Wishlist");
      } else {
        state.wishList = [...state.wishList, { ...action.payload }];
        console.log(state.wishList, "wishlist");
      }
    },
    deleteWishList: (state, action) => {
      console.log(action.payload);
      // toast("one item deleted");
      const index = state.wishList.findIndex((el) => el._id === action.payload);
      state.wishList.splice(index, 1);
    },
    increaseQty: (state, action) => {
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      let qty = state.cartItem[index].qty;
      const qtyInc = ++qty;
      state.cartItem[index].qty = qtyInc;

      const price = state.cartItem[index].price;
      const total = price * qtyInc;

      state.cartItem[index].total = total;
    },
    decreaseQty: (state, action) => {
      const index = state.cartItem.findIndex((el) => el._id === action.payload);

      let qty = state.cartItem[index].qty;
      if (qty > 1) {
        const qtyDec = --qty;
        state.cartItem[index].qty = qtyDec;
        const price = state.cartItem[index].price;
        const total = price * qtyDec;

        state.cartItem[index].total = total;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteJobById.fulfilled, (state, action) => {
      state.jobList = state.jobList.filter(
        (job) => job._id !== action.payload
      );
    });
  },
});

export const {
  setDataJob,
  addCartItem,
  deleteCartItem,
  addWishList,
  deleteWishList,
  increaseQty,
  decreaseQty,
} = jobSlice.actions;
export default jobSlice.reducer;
