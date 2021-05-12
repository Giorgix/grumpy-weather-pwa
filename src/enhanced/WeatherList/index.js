import { lazy } from 'react';
import { useDispatch } from 'react-redux';
import { Spinner, NotFound } from '../../components';
import { branch, withStoreState, withActionEffect, withDispatcher, toList } from '../../hoc';
import {
  selectAllWeather,
  getWeatherForecast,
  selectSevenDayWeather,
} from '../../redux/weather/weatherSlice';
import { selectLocation } from '../../redux/location/locationSlice';
import { compose, path, isNil, isEmpty } from 'ramda';

const WeatherSummary = lazy(() => import('../../components/WeatherSummary'));

const withInitialData = compose(
  withStoreState(selectLocation, 'location'),
  branch(path(['location', 'loading']), Spinner),
  branch(
    ({ location }) => location.completed && (!location.data || isNil(location.data.name)),
    NotFound('Location not found. Please search other location.'),
  ),
);

const withAsyncRequest = compose(
  //withDispatcher(useDispatch),
  // The weather data could be requested as an effect or an action
  //fetch(weatherUrlByLocation, parseResponse),
  //withActionEffect(null, getWeatherForecast, ({ location }) => location.data, null),
  withStoreState(selectAllWeather, 'weather'),
  withStoreState(selectSevenDayWeather, 'items'),
  branch(path(['weather', 'loading']), Spinner),
  branch(({ weather }) => weather.completed && isNil(weather.data), NotFound('Weather not found')),
  toList({ className: 'weather-list-component' }),
);

const enhance = compose(withInitialData, withAsyncRequest);

export default enhance(WeatherSummary);
