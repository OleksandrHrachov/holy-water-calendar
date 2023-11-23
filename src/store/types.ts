export interface ITodo {
  id: string;
  title: string;
  description: string | null;
  date: string;
  time: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export interface ITodoItem {
  [key: string]: ITodo[];
}

export interface ITodoState {
  todos: ITodoItem[];
}

export interface IUpdateData {
  selectedDay: string | null;
  todo: ITodo;
}

export const CREATE_MODAL = "createModal";
export const LIST_TODOS_MODAL = "listTodosModal";
export const EDIT_TODO_MODAL = "editTodoModal";
export const CALENDAR_MODAL = "calendarModal";

export type MODAL_TYPE =
  | typeof CREATE_MODAL
  | typeof LIST_TODOS_MODAL
  | typeof EDIT_TODO_MODAL
  | typeof CALENDAR_MODAL;

export interface IModalState {
  isCreateModalOpen: boolean;
  isListTodosModalOpen: boolean;
  isEditTodoModalOpen: boolean;
  isCalendarModalOpen: boolean;
}

export interface ISelectedDayState {
  selectedDay: string | null;
  selectedDayTodos: ITodo[];
  selectedTodo?: ITodo | null;
}
