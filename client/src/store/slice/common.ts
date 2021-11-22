import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState, AppDispatch } from '../index';
interface CounterState {
  value: number;
}

const initState: CounterState = {
  value: 0
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState: initState,
  reducers: {
    increment: state => {
      state.value += 1
    },
    decrement: state => {
      state.value -= 1;
    },
    incrementByAmount: (state: CounterState, action: PayloadAction<number>) => {
      state.value += action.payload;
    }
  }
});

export const {
  increment, decrement, incrementByAmount
} = counterSlice.actions;

export const incrementAsync = (amount: number) => (dispatch: AppDispatch) => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 5000);
};

export const selectCount = (state: RootState) => state.counter.value;

export default counterSlice.reducer;
