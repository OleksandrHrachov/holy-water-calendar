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

export const CREATE_MODAL = 'createModal';

export type MODAL_TYPE = typeof CREATE_MODAL;

export interface IModalState {
  isCreateModalOpen: boolean;
}
