import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axios";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (body, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/user/register", body);
      return response.data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userData, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/user/login", userData);

      return response.data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);

export const authUser = createAsyncThunk(
  "user/authUser",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/user/auth");
      return response.data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);

export const addHistory = createAsyncThunk(
  "transaction/addHistory",
  async (body, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/transactions/add", body);
      return response.data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);

export const deleteHistory = createAsyncThunk(
  "transaction/deleteHistory",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`/transactions/delete/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);
