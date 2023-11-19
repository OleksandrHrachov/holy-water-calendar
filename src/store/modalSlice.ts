import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IModalState, MODAL_TYPE, CREATE_MODAL } from "./types";

const initialState: IModalState = {
  isCreateModalOpen: false,
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

        default:
          break;
      }
    },
    closeModal(state, action: PayloadAction<MODAL_TYPE>) {
      switch (action.payload) {
        case CREATE_MODAL:
          state.isCreateModalOpen = false;
          break;

        default:
          break;
      }
    },
  },
});

export const { openModal, closeModal } = modalsSlice.actions;
export default modalsSlice.reducer;
