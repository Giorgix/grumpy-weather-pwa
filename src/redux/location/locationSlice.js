import { createSlice } from '@reduxjs/toolkit';
import { identity } from 'ramda';
import { geoFindMePromise, delay, randomNumber, projection } from '../../utils';
export const locationSlice = createSlice({
  name: 'location',
  initialState: {
    value: {
      current_lat: null,
      current_lon: null,
    },
  },
  reducers: {
    setLocation: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based on those changes
      state.value = action.payload;
      //state.value.completed = true;
      //state.value.loading = false;
    },
    initGetLocation: (state) => {
      state.value.completed = false;
      state.value.loading = true;
    },
  },
});

export const { setLocation  } = locationSlice.actions;


export async function getLocation(dispatch, getState) {
  // TODO if error get previous state and add error data
  const response = await geoFindMePromise()
    .catch((error) => {console.log(error); return {error};})
  dispatch({ type: 'location/setLocation', payload: response })
}

// we will use https://opencagedata.com/api for Forward and Reverse GeoCoding
// location = 'City/Country name' => lat and lon coordinates
// location = lat and lon coordinates => 'City/Country name'
const geoCodeUrlByLocation = (location) => `https://api.opencagedata.com/geocode/v1/json?q=${location}&key=f62e33ffb4294e3cb537350fde241077`;

const parseGeoCodeResponse = projection({
  location_results: 'results',
  current_lat: 'results.0.geometry.lat',
  current_lon: 'results.0.geometry.lng',
});

// Write a synchronous outer function that receives the `location` parameter:
export function getGeocode(location) {
  // And then creates and returns the async thunk function:
  return async function getGeocodeThunk(dispatch, getState) {
    //dispatch({ type: 'location/initGetLocation'})
    // ✅ Now we can use the location value and send it to the server
    //await delay(randomNumber(250, 3000));
    const response = await fetch(geoCodeUrlByLocation(location))
      .then(res => res.json())
      .then(data => {console.log('GOT GEODATA: ', data); return data;})
      .then(parseGeoCodeResponse)
    dispatch({ type: 'location/setLocation', payload: response })
  }
}

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectLocation = state => state.location.value;

export default locationSlice.reducer;