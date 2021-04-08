import { createSlice } from '@reduxjs/toolkit';
import { projection, delay, randomNumber } from '../../utils';

export const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    value: {
      unit: 'metric',
      data: null,
      loading: true,
      completed: false,
      updatedAt: Date.now()
    },
  },
  reducers: {
    switchUnit: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based on those changes
      state.value.unit = state.value.unit === 'metric' ? 'imperial' : 'metric';
    },
    updateUnitByValue: (state, action) => {
      state.value.unit = action.payload;
    },
    weatherUpdated: (state, action) => {
      state.value.data = action.payload.temp ? action.payload : null;
      state.value.completed = true;
      state.value.loading = false;
      state.value.updatedAt = Date.now();
    },
    initGetWeather: (state) => {
      state.value.completed = false;
      state.value.loading = true;
    },
  },
});

export const { switchUnit, updateUnitByValue  } = weatherSlice.actions;

const weatherUrlByLocation = (location) =>
  `http://api.openweathermap.org/data/2.5/weather?lat=${location.current_lat}&lon=${location.current_lon}&units=metric&APPID=8e69078d04cbc142a30de0c0456fe417`

const parseResponse = projection({
  temp: 'main.temp',
  description: 'weather.0.description',
  wind: 'wind',
  name: 'name'
});

// Write a synchronous outer function that receives the `location` parameter:
export function getWeather(location) {
  // And then creates and returns the async thunk function:
  return async function getWeatherThunk(dispatch, getState) {
    dispatch({ type: 'weather/initGetWeather'})
    // ✅ Now we can use the location value and send it to the server
    //await delay(randomNumber(250, 3000));
    const response = await fetch(weatherUrlByLocation(location))
      .then(res => res.json())
      .then(parseResponse)
    dispatch({ type: 'weather/weatherUpdated', payload: response })
  }
}

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectWeather = state => state.weather.value;
export const selectWeatherUnit = state => state.weather.value.unit;

export default weatherSlice.reducer;