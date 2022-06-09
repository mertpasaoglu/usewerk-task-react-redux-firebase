import { createSlice } from "@reduxjs/toolkit";

export const addToDoSlice = createSlice({
  name: "AddToDo",
  initialState: {
    title: "",
  },
  reducers: {
    setItem: (state, action) => {
      state.title = action.payload;
    },
  },
});

export const { setItem } = addToDoSlice.actions;

export default addToDoSlice.reducer;
