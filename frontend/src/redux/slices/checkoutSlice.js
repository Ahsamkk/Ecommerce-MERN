import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//Async thunk for creating a checkout session
export const createCheckout = createAsyncThunk(
  "checkout/createCheckout",
  async (
    {
      checkoutItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      paymentStatus,
      paymentDetails,
    },
    { rejectWithValue }
  ) => {
    try {
      const checkoutData = {
        checkoutItems,
        shippingAddress,
        paymentMethod,
        totalPrice,
        paymentStatus,
        paymentDetails,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout`,
        checkoutData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error creating checkout session:", {
        message: error.message,
        response: error.response?.data,
      });
      return rejectWithValue(
        error.response?.data || { message: "Unknown error" }
      );
    }
  }
);

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    checkout: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCheckout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCheckout.fulfilled, (state, action) => {
        state.loading = false;
        state.checkout = action.payload;
      })
      .addCase(createCheckout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default checkoutSlice.reducer;
