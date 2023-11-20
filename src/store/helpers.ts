import {
  LOCAL_STORAGE_TODO_KEY,
  LOCAL_STORAGE_DATE_KEY
} from "../const";
import { ITodoItem } from "./types";

export const saveCalendarState = async (state: ITodoItem[]) => {
  if (process.env.REACT_APP_BASE_URL_TODOS) {
    try {
      await fetch(process.env.REACT_APP_BASE_URL_TODOS, {
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
    const key = process.env.REACT_APP_LOCAL_STORAGE_TODO_KEY ?? LOCAL_STORAGE_TODO_KEY;
    localStorage.setItem(key, JSON.stringify(state));
  }
};

export const saveDateFilterState = async (state: string | null) => {
  if (process.env.REACT_APP_BASE_URL_DATE) {
    try {
      await fetch(process.env.REACT_APP_BASE_URL_DATE, {
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
    const key = process.env.REACT_APP_LOCAL_STORAGE_DATE_KEY ?? LOCAL_STORAGE_DATE_KEY;
    localStorage.setItem(key, JSON.stringify(state));
  }
};

export const getCalendarState = async () => {
  if (process.env.REACT_APP_BASE_URL_TODOS) {
    try {
      const response = await fetch(process.env.REACT_APP_BASE_URL_TODOS);
      return response;
    } catch (error) {
      return error;
    }
  } else {
    const key = process.env.REACT_APP_LOCAL_STORAGE_TODO_KEY ?? LOCAL_STORAGE_TODO_KEY;
    const state = localStorage.getItem(key);
    if (state) {
      return JSON.parse(state);
    } else {
      return [];
    }
  }
};

export const getDateFilterState = async () => {
  if (process.env.REACT_APP_BASE_URL_DATE) {
    try {
      const response = await fetch(process.env.REACT_APP_BASE_URL_DATE);
      return response;
    } catch (error) {
      return error;
    }
  } else {
    const key = process.env.REACT_APP_LOCAL_STORAGE_DATE_KEY ?? LOCAL_STORAGE_DATE_KEY;
    const state = localStorage.getItem(key);
    if (state) {
      return JSON.parse(state);
    } else {
      return "";
    }
  }
};
