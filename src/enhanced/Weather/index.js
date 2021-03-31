import { lazy } from "react";
import { Spinner } from '../../components';
import { fetch, branch  } from '../../hoc';
import { compose, pipe, prop, replace, isEmpty, none } from 'ramda';
import { projection } from '../../utils';

const Weather = lazy(() => import('../../components/Weather'));

const weatherUrlByLocation = ({lat, lon}) =>
  `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&APPID=8e69078d04cbc142a30de0c0456fe417`

const parseResponse = projection({
  temp: 'main.temp',
  description: 'weather.0.description',
  wind: 'wind'
});

const withData = compose(
  fetch(weatherUrlByLocation, parseResponse),
  branch(prop('loading'), Spinner)
)

export default withData(Weather);