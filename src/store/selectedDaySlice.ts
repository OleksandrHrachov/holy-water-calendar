import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISelectedDayState } from "./types";

const initialState: ISelectedDayState = {
  selectedDay: null,
  selectedDayTodos: [],
  selectedTodoId: null,
};

const selectedDaySlice = createSlice({
  name: "selectedDaySlice",
  initialState,
  reducers: {
    setSelectedDay(state, action: PayloadAction<ISelectedDayState>) {
      state.selectedDay = action.payload.selectedDay;
      state.selectedDayTodos = action.payload.selectedDayTodos;
    },
    resetSelectedDay(state) {
      state.selectedDay = null;
      state.selectedDayTodos = [];
      state.selectedTodoId = null;
    },
    setSelectedTodoId(state, action: PayloadAction<string>) {
      state.selectedTodoId = action.payload;
    },
  },
});

export const { setSelectedDay, resetSelectedDay, setSelectedTodoId } = selectedDaySlice.actions;
export default selectedDaySlice.reducer;
