import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";

// moment.updateLocale("en", { week: { dow: 1 } });

interface IDateState {
  currentDate: string;
  selectedDate: string | null;
}

const initialState: IDateState = {
  currentDate: moment().format(),
  selectedDate: null,
};

const dateSlice = createSlice({
  name: "dateSlice",
  initialState,
  reducers: {
    setCurrentDate(state, action: PayloadAction<string>) {
      state.currentDate = action.payload;
    },
    setSelectedtDate(state, action: PayloadAction<string>) {
      state.selectedDate = action.payload;
    },
  },
});

export const { setCurrentDate, setSelectedtDate } = dateSlice.actions;

export default dateSlice.reducer;
