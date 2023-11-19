import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IModalState,
  MODAL_TYPE,
  CREATE_MODAL,
  LIST_TODOS_MODAL,
} from "./types";

const initialState: IModalState = {
  isCreateModalOpen: false,
  isListTodosModalOpen: false,
};

const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<MODAL_TYPE>) {
      switch (action.payload) {
        case CREATE_MODAL:
          state.isCreateModalOpen = true;
          break;

        case LIST_TODOS_MODAL:
          state.isListTodosModalOpen = true;
          break;

        default:
          break;
      }
    },
    closeModal(state, action: PayloadAction<MODAL_TYPE>) {
      switch (action.payload) {
        case CREATE_MODAL:
          state.isCreateModalOpen = false;
          break;
          
        case LIST_TODOS_MODAL:
          state.isListTodosModalOpen = false;
          break;

        default:
          break;
      }
    },
  },
});

export const { openModal, closeModal } = modalsSlice.actions;
export default modalsSlice.reducer;
