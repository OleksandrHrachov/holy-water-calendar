export interface ITodo {
  id: string;
  title: string;
  description: string | null;
  date: string;
  time: string | null;
  createdAt?: string;
  updatedAt?: string | null;
}

export interface ITodoItem {
  [key: string]: ITodo[];
}

export interface ITodoState {
  todos: ITodoItem[];
}
