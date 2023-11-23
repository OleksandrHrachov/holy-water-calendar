import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITodoState, ITodo, ITodoItem, IUpdateData } from "./types";
import { ApiStorageService } from '../services/ApiStorageService';

const initialState: ITodoState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    initState(state, action: PayloadAction<ITodoItem[] | []>) {
      state.todos = action.payload;
    },
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
          [action.payload.date]: [
            {
              id: action.payload.id,
              title: action.payload.title,
              description: action.payload.description,
              date: action.payload.date,
              time: action.payload.time,
              createdAt: action.payload.createdAt,
              updatedAt: null,
            },
          ],
        });
      }

      ApiStorageService.saveCalendarState(state.todos);
    },
    updateToDo(state, action: PayloadAction<IUpdateData>) {
      const key = action.payload.selectedDay;

      const filteredCalendarDays = state.todos.map((day) => {
        let filteredDay;
        if (key && day.hasOwnProperty(key)) {
          filteredDay = day[key].filter((todo) => {
            return todo.id !== action.payload.todo.id;
          });
        }

        if (filteredDay) {
          return { [key!]: filteredDay };
        }

        return day;
      });

      const calendarWithoutEmptyDays = filteredCalendarDays.filter((day) => {
        const dayKey = Object.keys(day)[0];
        return day[dayKey].length !== 0;
      });

      state.todos = calendarWithoutEmptyDays;

      const newKey = action.payload.todo.date;
      const selectedDayIndex = state.todos.findIndex((day) =>
        day.hasOwnProperty(newKey)
      );

      if (selectedDayIndex !== -1) {
        state.todos[selectedDayIndex][newKey].push({
          id: action.payload.todo.id,
          title: action.payload.todo.title,
          description: action.payload.todo.description,
          date: action.payload.todo.date,
          time: action.payload.todo.time,
          createdAt: null,
          updatedAt: action.payload.todo.updatedAt,
        });
      } else {
        state.todos.push({
          [action.payload.todo.date]: [
            {
              id: action.payload.todo.id,
              title: action.payload.todo.title,
              description: action.payload.todo.description,
              date: action.payload.todo.date,
              time: action.payload.todo.time,
              createdAt: null,
              updatedAt: action.payload.todo.updatedAt,
            },
          ],
        });
      }

      ApiStorageService.saveCalendarState(state.todos);
    },
    removeToDo(state, action: PayloadAction<IUpdateData>) {
      const key = action.payload.selectedDay;

      const filteredCalendarDays = state.todos.map((day) => {
        let filteredDay;
        if (key && day.hasOwnProperty(key)) {
          filteredDay = day[key].filter((todo) => {
            return todo.id !== action.payload.todo.id;
          });
        }

        if (filteredDay) {
          return { [key!]: filteredDay };
        }

        return day;
      });

      state.todos = filteredCalendarDays;
      ApiStorageService.saveCalendarState(state.todos);
    },
  },
});

export const { addToDo, initState, updateToDo, removeToDo } = todoSlice.actions;
export default todoSlice.reducer;
