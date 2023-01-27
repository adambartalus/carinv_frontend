import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, logout } from "./fetch/fetchAuth";

const user = localStorage.getItem('user');

const initialState = {
  user: user ? JSON.parse(user) : null,
  logging: false,
};

export const loginThunk = createAsyncThunk(
  'auth/login',
  async ({usernameOrEmail, password, ...args}, thunkAPI) => {
    const response = await login(usernameOrEmail, password);
    const data = await response.json();
    return data;
  }
);

export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (args, thunkAPI) => {
    const response = await logout();
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.user = action.payload;
      state.logging = false;
      localStorage.setItem('user', JSON.stringify(action.payload));
    });
    builder.addCase(loginThunk.rejected, (state, action) => {
      state.logging = false;
    });
    builder.addCase(loginThunk.pending, (state, action) => {
      state.logging = true;
    });
    builder.addCase(logoutThunk.fulfilled, (state, action) => {
      state.user = null;
      localStorage.removeItem('user');
    })
  },
});

export default authSlice.reducer;
