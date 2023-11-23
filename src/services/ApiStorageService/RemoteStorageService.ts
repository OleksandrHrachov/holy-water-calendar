import { ITodoItem } from "../../store/types";
import { IDataService } from "./types";

export class RemoteStorageService implements IDataService {
  async getTodoData(url: string): Promise<ITodoItem[] | []> {
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data) {
        return data;
      } else {
        return [];
      }
    } catch (error) {
      throw new Error("some error");
    }
  }

  async getDateData(url: string): Promise<string> {
    try {
      const data = localStorage.getItem(url);
      if (data) {
        return JSON.parse(data);
      } else {
        return "";
      }
    } catch (error) {
      throw new Error("some error");
    }
  }

  async saveData<T>(url: string, data: T): Promise<void> {
    try {
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      throw new Error("some error");
    }
    
  }
}
