import { ITodoItem } from "../../store/types";

export interface IDataService {
  getTodoData(key: string): Promise<ITodoItem[] | []>;
  getDateData(key: string): Promise<string>;
  saveData<T>(key: string, data: T): void;
}
