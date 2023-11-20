import {
  LOCAL_STORAGE_TODO_KEY,
  LOCAL_STORAGE_DATE_KEY,
  BASE_URL_TODOS,
  BASE_URL_DATE,
} from "../const";
import { ITodoItem } from "./types";

export const saveCalendarState = async (state: ITodoItem[]) => {
  if (BASE_URL_TODOS) {
    try {
      await fetch(BASE_URL_TODOS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(state),
      });
    } catch (error) {
      return error;
    }
  } else {
    localStorage.setItem(LOCAL_STORAGE_TODO_KEY, JSON.stringify(state));
  }
};

export const saveDateFilterState = async (state: string | null) => {
  if (BASE_URL_DATE) {
    try {
      await fetch(BASE_URL_DATE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(state),
      });
    } catch (error) {
      return error;
    }
  } else {
    localStorage.setItem(LOCAL_STORAGE_DATE_KEY, JSON.stringify(state));
  }
};

export const getCalendarState = async () => {
  if (BASE_URL_TODOS) {
    try {
      const response = await fetch(BASE_URL_TODOS);
      return response;
    } catch (error) {
      return error;
    }
  } else {
    const state = localStorage.getItem(LOCAL_STORAGE_TODO_KEY);
    if (state) {
      return JSON.parse(state);
    } else {
      return [];
    }
  }
};

export const getDateFilterState = async () => {
  if (BASE_URL_DATE) {
    try {
      const response = await fetch(BASE_URL_DATE);
      return response;
    } catch (error) {
      return error;
    }
  } else {
    const state = localStorage.getItem(LOCAL_STORAGE_DATE_KEY);
    if (state) {
      return JSON.parse(state);
    } else {
      return "";
    }
  }
};
