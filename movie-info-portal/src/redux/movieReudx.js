import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    currentMovie: null,
  },
  reducers: {
    Start: (state, action) => {
      state.isFetching = true;
    },
    addCurrentMovie: (state, action) => {
      console.log("action", action.payload);
      state.currentMovie = action.payload;
    },
    Success: (state, action) => {
      state.isFetching = false;
    },
    Failure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    emptyExpenses: (state, action) => {
      state.expenses = [];
    },
  },
});

export const { Start, Success, Failure,addCurrentMovie } = movieSlice.actions;
export default movieSlice.reducer;
