import { LOCAL_STORAGE_KEY } from "../const";
import { ITodoItem } from "./types";

export const saveCalendarState = (state: ITodoItem[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
};

export const getCalendarState = (): ITodoItem[] | [] => {
  const state = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (state) {
    return JSON.parse(state);
  } else {
    return [];
  }
};
