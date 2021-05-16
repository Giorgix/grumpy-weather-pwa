import { lazy } from 'react';
import { useDispatch } from 'react-redux';
import { Spinner, NotFound } from '../../components';
import { branch, withStoreState, withDispatcher, withProps } from '../../hoc';
import { selectTomorrowWeather } from '../../redux/weather/weatherSlice';
import { selectLocation } from '../../redux/location/locationSlice';
import { compose, path, isNil } from 'ramda';

const Weather = lazy(() => import('../../components/Weather'));

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
  withStoreState(selectTomorrowWeather, 'weather'),
  branch(path(['weather', 'loading']), Spinner),
  branch(({ weather }) => weather.completed && isNil(weather.data), NotFound('Weather not found')),
  withProps({
    dateFormat: {
      hour12: false,
      hour: undefined,
      minute: undefined,
      weekday: 'long',
      day: '2-digit',
      month: 'long',
    },
  }),
);

const enhance = compose(withInitialData, withAsyncRequest);

export default enhance(Weather);
