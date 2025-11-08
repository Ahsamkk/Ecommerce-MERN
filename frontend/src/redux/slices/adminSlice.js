import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../utils/api.js";

// fetch all users (admin only)
export const fetchUsers = createAsyncThunk("admin/fetchUsers", async () => {
  const token = JSON.parse(localStorage.getItem("userToken"));
  const response = await apiRequest("get", "/api/admin/users", null, token);
  return response;
});

// add user action
export const addUser = createAsyncThunk(
  "admin/addUser",
  async (userData, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("userToken"));
      const response = await apiRequest(
        "post",
        "/api/admin/users",
        userData,
        token
      );
      return response;
    } catch (error) {
      console.error("Error creating user:", error);
      return rejectWithValue(error.response.data);
    }
  }
);

// Update user info
export const updateUser = createAsyncThunk(
  "admin/updateUser",
  async ({ id, name, email, role }) => {
    const token = JSON.parse(localStorage.getItem("userToken"));
    const response = await apiRequest(
      "put",
      `/api/admin/users/${id}`,
      { name, email, role },
      token
    );
    return response;
  }
);

// Delete user
export const deleteUser = createAsyncThunk("admin/deleteUser", async (id) => {
  const token = JSON.parse(localStorage.getItem("userToken"));
  const response = await apiRequest(
    "delete",
    `/api/admin/users/${id}`,
    null,
    token
  );
  return response;
});

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //Fetch users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Update User
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUser = action.payload;
        const index = state.users.findIndex(
          (user) => user._id === updatedUser._id
        );
        if (index !== -1) {
          state.users[index] = updatedUser;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Delete User
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter((user) => user._id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default adminSlice.reducer;
