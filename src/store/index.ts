import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice";
import modalReducer from "./modalSlice";
import selectedDayReducer from "./selectedDaySlice";

const store = configureStore({
  reducer: {
    todos: todoReducer,
    modal: modalReducer,
    selectedDay: selectedDayReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
