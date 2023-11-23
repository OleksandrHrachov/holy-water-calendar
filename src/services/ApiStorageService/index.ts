import { LOCAL_STORAGE_TODO_KEY, LOCAL_STORAGE_DATE_KEY } from "../../const";
import { RemoteStorageService } from "./RemoteStorageService";
import { LocalStorageService } from "./LocalStorageService";
import { ITodoItem } from "../../store/types";

const localStorageService = new LocalStorageService();
const remoteStorageService = new RemoteStorageService();

export class ApiStorageService {
  static async saveCalendarState (state: ITodoItem[]) {
    try {
      if (process.env.REACT_APP_BASE_URL_TODOS) {
        remoteStorageService.saveData(process.env.REACT_APP_BASE_URL_TODOS, state);
      } else {
        const key =
          process.env.REACT_APP_LOCAL_STORAGE_TODO_KEY ?? LOCAL_STORAGE_TODO_KEY;
        localStorageService.saveData<ITodoItem[]>(key, state);
      }
    } catch (error) {
      throw new Error("some error");
    }
  }

  static async saveDateFilterState(state: string) {
    try {
      if (process.env.REACT_APP_BASE_URL_DATE) {
        remoteStorageService.saveData(process.env.REACT_APP_BASE_URL_DATE, state)
      } else {
        const key =
          process.env.REACT_APP_LOCAL_STORAGE_DATE_KEY ?? LOCAL_STORAGE_DATE_KEY;
        localStorageService.saveData<string>(key, state);
      }
    } catch (error) {
      throw new Error("some error");
    }
  }

  static async getCalendarState(): Promise<ITodoItem[] | []> {
    try {
      if (process.env.REACT_APP_BASE_URL_TODOS) {
        const response = await remoteStorageService.getTodoData(process.env.REACT_APP_BASE_URL_TODOS);
        return response;
      } else {
        const key =
          process.env.REACT_APP_LOCAL_STORAGE_TODO_KEY ?? LOCAL_STORAGE_TODO_KEY;
        const state = localStorageService.getTodoData(key);
        return state;
      }
    } catch (error) {
      throw new Error("some error");
    }
  }

  static async getDateFilterState(): Promise<string> {
    try {
      if (process.env.REACT_APP_BASE_URL_DATE) {
        const response = await fetch(process.env.REACT_APP_BASE_URL_DATE);
        return response.json() as Promise<string>;
      } else {
        const key =
          process.env.REACT_APP_LOCAL_STORAGE_DATE_KEY ?? LOCAL_STORAGE_DATE_KEY;
        const state = localStorageService.getDateData(key);
        return state;
      }
    } catch (error) {
      throw new Error("some error");
    }
  }
}
