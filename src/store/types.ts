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

export const CREATE_MODAL = "createModal";
export const LIST_TODOS_MODAL = "listTodosModal";

export type MODAL_TYPE = typeof CREATE_MODAL | typeof LIST_TODOS_MODAL;

export interface IModalState {
  isCreateModalOpen: boolean;
  isListTodosModalOpen: boolean;
}

export interface ISelectedDayState {
  selectedDay: string | null;
  selectedDayTodos: ITodo[];
  selectedTodoId?: string | null;
}
