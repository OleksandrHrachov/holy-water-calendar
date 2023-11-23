import { ITodoItem } from "../../store/types";

export interface IDataService {
  getTodoData(key: string): Promise<ITodoItem[] | []>;
  getDateData(key: string): Promise<string>;
  saveData<T>(key: string, data: T): void;
}

export interface IApiStorageService {
  saveCalendarState (state: ITodoItem[]): void;
  saveDateFilterState(state: string): void;
  getCalendarState(): Promise<ITodoItem[] | []>
  getDateFilterState(): Promise<string>
}
