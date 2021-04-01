import { createSlice } from '@reduxjs/toolkit';

export const temperatureSlice = createSlice({
  name: 'temperature',
  initialState: {
    value: 'metric',
  },
  reducers: {
    switchUnit: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based on those changes
      state.value = state.value === 'metric' ? 'imperial' : 'metric';
    },
    updateByValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { switchUnit, updateByValue  } = temperatureSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const updateAsync = unit => dispatch => {
  setTimeout(() => {
    dispatch(updateByValue(unit));
  }, 1000);
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectTemperature = state => state.temperature.value;

export default temperatureSlice.reducer;