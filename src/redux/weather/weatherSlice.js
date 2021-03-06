import { createSlice } from '@reduxjs/toolkit';
import { path } from 'ramda';
import {
  projection,
  delay,
  randomNumber,
  checkSameLocation,
  checkTimeDiffFromNow,
} from '../../utils';

export const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    value: {
      unit: 'metric',
      data: null,
      error: null,
      loading: true,
      completed: false,
      updatedAt: Date.now(),
    },
  },
  reducers: {
    switchUnit: (state) => {
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
      state.value.data = action.payload;
      state.value.error = null;
      state.value.completed = true;
      state.value.loading = false;
      state.value.updatedAt = Date.now();
    },
    initGetWeather: (state) => {
      state.value.completed = false;
      state.value.loading = true;
    },
    setWeatherError: (state, action) => {
      state.value.error = action.error;
      state.value.data = null;
      state.value.completed = true;
      state.value.loading = false;
    },
    weatherForecastUpdated: (state, action) => {
      state.value.forecast_data = action.payload;
      state.value.forecast_error = null;
      state.value.forecast_completed = true;
      state.value.forecast_loading = false;
    },
    initGetWeatherForecast: (state) => {
      state.value.forecast_completed = false;
      state.value.forecast_loading = true;
    },
    setWeatherForecastError: (state, action) => {
      state.value.forecast_error = action.error;
      state.value.forecast_data = null;
      state.value.forecast_completed = true;
      state.value.forecast_loading = false;
    },
    setWeatherLoading: (state) => {
      state.value.completed = false;
      state.value.loading = true;
    },
    setWeatherLoaded: (state) => {
      state.value.completed = true;
      state.value.loading = false;
    },
  },
});

export const { switchUnit, updateUnitByValue } = weatherSlice.actions;

const weatherUrlByLocation = (location) =>
  `https://api.openweathermap.org/data/2.5/weather?lat=${location.current_lat}&lon=${location.current_lon}&units=metric&APPID=8e69078d04cbc142a30de0c0456fe417`;

const weatherForecastUrlByLocation = (location) =>
  `https://api.openweathermap.org/data/2.5/onecall?lat=${location.current_lat}&lon=${location.current_lon}&exclude=minutely&units=metric&APPID=8e69078d04cbc142a30de0c0456fe417`;

const grumpyMapper = {
  'broken clouds': 'Tiempo de mierda, enserio...',
  'few clouds': 'Parece que bien pero no, puede caer fuerte',
};

const parseResponse = projection({
  temp: 'main.temp',
  temp_max: 'main.temp_max',
  temp_min: 'main.temp_min',
  feels_like: 'main.feels_like',
  description: (data) => grumpyMapper[data.weather[0].description] || data.weather[0].description,
  icon: (data) => `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`,
  wind: 'wind',
  name: 'name',
});

// Write a synchronous outer function that receives the `location` parameter:
export function getWeather(locationData) {
  // And then creates and returns the async thunk function:
  return async function getWeatherThunk(dispatch, getState) {
    dispatch({ type: 'weather/initGetWeather' });
    // ??? Now we can use the location value and send it to the server
    //await delay(randomNumber(250, 3000));
    try {
      const response = await fetch(weatherUrlByLocation(locationData))
        .then((res) => res.json())
        .then(parseResponse);
      if (response.temp && response.name) {
        dispatch({ type: 'weather/weatherUpdated', payload: response });
      } else {
        throw new Error('Error getting weather :(');
      }
    } catch (error) {
      dispatch({ type: 'weather/setWeatherError', error: 'Error getting weather :(' });
    }
  };
}

const parseForecastResponse = projection({
  hourly: 'hourly',
  daily: (data) =>
    data.daily.map((dayData) => ({
      temp: path(['temp', 'day'], dayData),
      temp_max: path(['temp', 'max'], dayData),
      temp_min: path(['temp', 'min'], dayData),
      feels_like: path(['feels_like', 'day'], dayData),
      humidity: dayData.humidity,
      rain_prob: dayData.pop ? Math.round(dayData.pop * 100) : 0,
      sunrise: dayData.sunrise,
      sunset: dayData.sunset,
      description: path(['weather', '0', 'description'], dayData),
      icon: `https://openweathermap.org/img/wn/${dayData.weather[0].icon}@4x.png`,
      wind: {
        speed: dayData.wind_speed,
        deg: dayData.wind_deg,
      },
      date: dayData.dt,
    })),
});

// Write a synchronous outer function that receives the `location` parameter:
export function getWeatherForecast(locationData) {
  // And then creates and returns the async thunk function:
  return async function getWeatherForecastThunk(dispatch, getState) {
    const { weather, location } = getState();
    const previousLocation = location.value.previous_location;
    const isSameLocation = checkSameLocation(previousLocation, locationData);
    const lessThanTwoHours = checkTimeDiffFromNow(weather.value.updatedAt, 120);
    if (weather.value.data && lessThanTwoHours && isSameLocation) {
      console.log('AVOIDING REQUEST BEFORE 2 2min');
      dispatch({ type: 'weather/setWeatherLoaded' });
      return;
    }
    dispatch({ type: 'weather/initGetWeather' });
    // ??? Now we can use the location value and send it to the server
    //await delay(randomNumber(250, 3000));
    try {
      const response = await fetch(weatherForecastUrlByLocation(locationData))
        .then((res) => res.json())
        .then(parseForecastResponse);
      if (response.hourly && response.daily) {
        dispatch({ type: 'weather/weatherUpdated', payload: response });
        dispatch({ type: 'location/updatePreviousLocation' });
      } else {
        throw new Error('Error getting weather :(');
      }
    } catch (error) {
      dispatch({
        type: 'weather/setWeatherError',
        error: 'Error getting weather :(',
      });
    }
  };
}

const parseHours = (hourlyData) => {
  const hour = hourlyData.dt * 1000;
  const formattedHour =
    hour && new Date(hour).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  return formattedHour;
};

const getHours = (hourlyData) => {
  const parsedHours = hourlyData.map(parseHours);
  const morningIndex = parsedHours.indexOf('06:00');
  return {
    today: hourlyData.slice(0, morningIndex + 1),
    tomorrow: hourlyData.slice(morningIndex, 48),
  };
};
const today = new Date()
const tomorrow = new Date(today)
tomorrow.setDate(tomorrow.getDate() + 1);
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectAllWeather = (state) => state.weather.value;
export const selectTodayWeather = (state) => ({
  ...state.weather.value,
  data: path(['data', 'daily', '0'], state.weather.value),
  hourly:
    path(['data', 'hourly'], state.weather.value) &&
    getHours(path(['data', 'hourly'], state.weather.value)).today,
});
export const selectTomorrowWeather = (state) => ({
  ...state.weather.value,
  data: path(['data', 'daily', '1'], state.weather.value),
  hourly:
    path(['data', 'hourly'], state.weather.value) &&
    getHours(path(['data', 'hourly'], state.weather.value)).tomorrow,
  updatedAt: tomorrow,
});
export const selectSevenDayWeather = (state) =>
  path(['data', 'daily'], state.weather.value).map((dailyItem) => ({
    ...dailyItem,
    unit: state.weather.value.unit,
  }));
export const selectWeatherUnit = (state) => state.weather.value.unit;

export default weatherSlice.reducer;
