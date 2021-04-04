import { lazy } from "react";
import { useDispatch } from 'react-redux'
import { Spinner, NotFound } from '../../components';
import { fetch, branch, withStoreState, withAsyncEffect, withAction, withDispatcher } from '../../hoc';
import { selectWeather, getWeather } from '../../redux/weather/weatherSlice'
import { selectLocation, getLocation } from '../../redux/location/locationSlice'
import { compose, prop, path, isNil } from 'ramda';
import { projection, geoFindMePromise } from '../../utils';

const Weather = lazy(() => import('../../components/Weather'));

const weatherUrlByLocation = ({location}) =>
  `http://api.openweathermap.org/data/2.5/weather?lat=${location.current_lat}&lon=${location.current_lon}&units=metric&APPID=8e69078d04cbc142a30de0c0456fe417`

const parseResponse = projection({
  temp: 'main.temp',
  description: 'weather.0.description',
  wind: 'wind'
});


const withInitialData = compose(
  // The geoposition data could be requested as an effect or an action
  //withAsyncEffect(geoFindMePromise, []),
  withDispatcher(useDispatch),
  //withAction(getLocation, false, false),
  withStoreState(selectLocation, 'location'),
  branch(({location}) => location && isNil(location.current_lat), NotFound('Location not found')),
)

const withAsyncRequest = compose(
  // The weather data could be requested as an effect or an action
  //fetch(weatherUrlByLocation, parseResponse),
  withAction(null, getWeather, 'location'),
  withStoreState(selectWeather, 'weather'),
  branch(path(['weather', 'loading']), Spinner),
  branch(({weather}) => weather.completed && isNil(weather.data), NotFound('Weather not found')),
)

const enhance = compose(
  withInitialData,
  withAsyncRequest
)

export default enhance(Weather);