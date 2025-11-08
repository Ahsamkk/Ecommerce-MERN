import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../utils/api.js";

//Async thunk for fetching orders by userId
export const fetchUserOrders = createAsyncThunk(
  "orders/fetchUserOrders",
  async (_, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("userToken"));
      const response = await apiRequest(
        "get",
        "/api/orders/my-orders",
        null,
        token
      );
      return response;
    } catch (error) {
      console.error("Error fetching orders:", error);
      return rejectWithValue(error.response.data);
    }
  }
);

//Async thunk for fetching order details by orderId
export const fetchOrderDetails = createAsyncThunk(
  "orders/fetchOrderDetails",
  async (orderId, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("userToken"));
      const response = await apiRequest(
        "get",
        `/api/orders/${orderId}`,
        null,
        token
      );
      return response;
    } catch (error) {
      console.error("Error fetching order details:", error);
      return rejectWithValue(error.response.data);
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    totalOrders: 0,
    orderDetails: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //Fetch user orders
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      //Fetch order details
      .addCase(fetchOrderDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetails = action.payload;
      })
      .addCase(fetchOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
