import { createSlice } from '@reduxjs/toolkit';
import { geoFindMePromise } from '../../utils';
export const locationSlice = createSlice({
  name: 'location',
  initialState: {
    value: {
      'name': 'Madrid',
      lat: '40.416775',
      lon: '-3.703790',
      updatedAt: Date.now()
    },
  },
  reducers: {
    updateDate: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based on those changes
      state.value.updatedAt = Date.now();
    },
    setLocation: (state, action) => {
      state.value = action.payload;
      state.value.updatedAt = Date.now();
    },
  },
});

export const { setLocation, updateDate  } = locationSlice.actions;


export async function getLocation(dispatch, getState) {
  const response = await geoFindMePromise().then((data) => {console.log(data); return data})
  dispatch({ type: 'location/setLocation', payload: response })
}

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectLocation = state => state.location.value;

export default locationSlice.reducer;