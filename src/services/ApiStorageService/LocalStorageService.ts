import { ITodoItem } from "../../store/types";
import { IDataService } from "./types";

export class LocalStorageService implements IDataService {
  async getTodoData(key: string): Promise<ITodoItem[] | []> {
    try {
      const data = localStorage.getItem(key);
      if (data) {
        return JSON.parse(data);
      } else {
        return [];
      }
    } catch (error) {
      throw new Error("some error");
    }
  }

  async getDateData(key: string): Promise<string> {
    try {
      const data = localStorage.getItem(key);
      if (data) {
        return JSON.parse(data);
      } else {
        return "";
      }
    } catch (error) {
      throw new Error("some error");
    }
  }

  async saveData<T>(key: string, data: T): Promise<void> {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      throw new Error("some error");
    }
  }
}
