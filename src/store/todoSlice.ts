import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITodoState, ITodo } from "./types";
import { getCalendarState, saveCalendarState } from "./helpers";

const initState = getCalendarState();

const initialState: ITodoState = {
  todos: initState,
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addToDo(state, action: PayloadAction<ITodo>) {
      const key = action.payload.date;
      const selectedDayIndex = state.todos.findIndex((day) =>
        day.hasOwnProperty(key)
      );

      if (selectedDayIndex !== -1) {
        state.todos[selectedDayIndex][key].push({
          id: action.payload.id,
          title: action.payload.title,
          description: action.payload.description,
          date: action.payload.date,
          time: action.payload.time,
          createdAt: action.payload.createdAt,
          updatedAt: null,
        });
      } else {
        state.todos.push({
          [action.payload.date]: [{
            id: action.payload.id,
            title: action.payload.title,
            description: action.payload.description,
            date: action.payload.date,
            time: action.payload.time,
            createdAt: action.payload.createdAt,
            updatedAt: null,
          }],
        });
      }

      saveCalendarState(state.todos)
    },
  },
});

export const { addToDo } = todoSlice.actions;
export default todoSlice.reducer;
