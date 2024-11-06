import { createSlice } from "@reduxjs/toolkit";

export interface CounterSliceState {
  startTimestamp: number;
  endTimestamp: number;
}

const initialState: CounterSliceState = {
  startTimestamp: 0,
  endTimestamp: 0,
};

export const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    startTimer: (state) => {
      state.startTimestamp = Date.now();
    },
    stopTimer: (state) => {
      state.endTimestamp = Date.now();
    },
  },
  selectors: {
    selectStartTimestamp: (timer) => timer.startTimestamp,
    selectEndTimestamp: (timer) => timer.endTimestamp,
  },
});

export const { startTimer, stopTimer } = timerSlice.actions;

export const { selectStartTimestamp, selectEndTimestamp } =
  timerSlice.selectors;
