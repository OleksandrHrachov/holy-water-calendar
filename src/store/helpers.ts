import { LOCAL_STORAGE_TODO_KEY, LOCAL_STORAGE_DATE_KEY } from "../const";
import { ITodoItem } from "./types";

export const saveCalendarState = (state: ITodoItem[]) => {
  localStorage.setItem(LOCAL_STORAGE_TODO_KEY, JSON.stringify(state));
};

export const saveDateFilterState = (state: string | null) => {
  localStorage.setItem(LOCAL_STORAGE_DATE_KEY, JSON.stringify(state));
};

export const getCalendarState = (): ITodoItem[] | [] => {
  const state = localStorage.getItem(LOCAL_STORAGE_TODO_KEY);

  if (state) {
    return JSON.parse(state);
  } else {
    return [];
  }
};

export const getDateFilterState = (): string | null => {
  const state = localStorage.getItem(LOCAL_STORAGE_DATE_KEY);

  if (state) {
    return JSON.parse(state);
  } else {
    return null;
  }
};
