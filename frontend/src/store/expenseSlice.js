import { createSlice } from "@reduxjs/toolkit";
import { addHistory, deleteHistory } from "./thunkFunctions";
import { toast } from "react-toastify";

const initialState = {
  expenses: [],
  isLoading: false,
  error: "",
};

const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addHistory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addHistory.fulfilled, (state, action) => {
        const { _id, date, category, amount, description } = action.payload;
        const newExpense = {
          _id,
          date,
          category,
          amount,
          description,
        };

        state.expenses = [...state.expenses, newExpense];
        state.isLoading = false;
      })

      .addCase(addHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteHistory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteHistory.fulfilled, (state, action) => {
        const { deletedId } = action.payload;
        state.expenses = state.expenses.filter(
          (expense) => expense._id !== deletedId
        );
        state.isLoading = false;
        toast.success("Transaction deleted successfully.");
      })
      .addCase(deleteHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        toast.error(`Error deleting transaction: ${action.error.message}`);
      });
  },
});

export default expenseSlice.reducer;
