import { createSlice } from '@reduxjs/toolkit';
import { path } from 'ramda';
import { geoFindMePromise, delay, randomNumber, projection, checkSameLocation } from '../../utils';
export const locationSlice = createSlice({
  name: 'location',
  initialState: {
    value: {
      data: null,
      previous_location: null,
      loading: true,
      completed: false,
      current_loading: true,
      hasGeoLocation: false,
      error: null,
    },
  },
  reducers: {
    initGetDeviceLocation: (state) => {
      state.value.current_completed = false;
      state.value.current_loading = true;
    },
    setDeviceLocation: (state, action) => {
      state.value.data = action.payload;
      state.value.device_error = null;
      state.value.hasGeoLocation = true;
      state.value.current_completed = true;
      state.value.current_loading = false;
    },
    setDeviceLocationError: (state, action) => {
      state.value.device_error = action.payload;
      state.value.hasGeoLocation = false;
      state.value.current_completed = true;
      state.value.current_loading = false;
      state.value.completed = true;
      state.value.loading = false;
    },
    setLocationInfoError: (state, action) => {
      state.value.info_error = action.payload;
      if (state.value.data && state.value.data.name) {
        state.value.data.name = null;
      } else {
        state.value.data = {};
        state.value.data.name = null;
      }
      state.value.completed = true;
      state.value.loading = false;
    },
    initGetLocationInfo: (state) => {
      state.value.completed = false;
      state.value.loading = true;
    },
    setLocationLoaded: (state) => {
      state.value.completed = true;
      state.value.loading = false;
    },
    setLocationInfo: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based on those changes
      state.value.previous_location = state.value.data === null ? action.payload : state.value.data;
      state.value.data = action.payload;
      state.value.info_error = null;
      state.value.completed = true;
      state.value.loading = false;
    },
    updatePreviousLocation: (state) => {
      state.value.previous_location = state.value.data;
    },
  },
});

export const { setLocation } = locationSlice.actions;

export async function getCurrentLocation(dispatch, getState) {
  // TODO if error get previous state and add error data
  dispatch({ type: 'location/initGetDeviceLocation' });
  try {
    const response = await geoFindMePromise();
    dispatch({ type: 'location/setDeviceLocation', payload: response });
    dispatch(getGeocode(response));
  } catch (error) {
    dispatch({
      type: 'location/setDeviceLocationError',
      payload: 'Error getting device location :(',
    });
  }
}

// we will use https://opencagedata.com/api for Forward and Reverse GeoCoding
// location = 'City/Country name' => lat and lon coordinates
// location = lat and lon coordinates => 'City/Country name'
const geoCodeUrlByLocation = (location) =>
  `https://api.opencagedata.com/geocode/v1/json?q=${location}&key=f62e33ffb4294e3cb537350fde241077`;

const getLocationName = (data) => {
  const locationInfo = {
    quarter: path(['results', '0', 'components', 'quarter'], data),
    suburb: path(['results', '0', 'components', 'suburb'], data),
    city: path(['results', '0', 'components', 'city'], data),
    state: path(['results', '0', 'components', 'state'], data),
  };
  return (
    locationInfo.city &&
    (locationInfo.quarter ? locationInfo.quarter : locationInfo.suburb || locationInfo.state)
      .concat(', ')
      .concat(locationInfo.city)
  );
};

const parseGeoCodeResponse = projection({
  name: getLocationName,
  current_lat: 'results.0.geometry.lat',
  current_lon: 'results.0.geometry.lng',
});

// Write a synchronous outer function that receives the `location` parameter:
export function getGeocode(locationData) {
  // And then creates and returns the async thunk function:
  return async function getGeocodeThunk(dispatch, getState) {
    const { location } = getState();
    const previousLocation = location.value.previous_location;
    const isSameLocation = checkSameLocation(previousLocation, locationData);
    if (location.value.data && isSameLocation) {
      console.log('AVOIDING LOCATION REQUEST');
      dispatch({ type: 'location/setLocationLoaded' });
      return;
    }
    dispatch({ type: 'location/initGetLocationInfo' });
    dispatch({ type: 'weather/setWeatherLoading' });
    // ??? Now we can use the location value and send it to the server
    //await delay(randomNumber(250, 3000));
    try {
      const response = await fetch(
        geoCodeUrlByLocation(
          locationData.current_lat
            ? `${locationData.current_lat}+${locationData.current_lon}`
            : locationData,
        ),
      )
        .then((res) => res.json())
        .then(parseGeoCodeResponse);
      if (response.current_lat && response.current_lon) {
        dispatch({ type: 'location/setLocationInfo', payload: response });
      } else {
        throw new Error('Error getting location info :(');
      }
    } catch (error) {
      dispatch({
        type: 'location/setLocationInfoError',
        payload: 'Error getting location info :(',
      });
    }
  };
}

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectLocation = (state) => state.location.value;

export default locationSlice.reducer;
