import { lazy } from "react";
import { Spinner } from '../../components';
import { fetch, branch, withStoreState, withEffect, withState } from '../../hoc';
import { selectTemperature } from '../../redux/temperature/temperatureSlice'
import { selectLocation } from '../../redux/location/locationSlice'
import { compose, pipe, prop, replace, isEmpty, none } from 'ramda';
import { projection } from '../../utils';

const Weather = lazy(() => import('../../components/Weather'));

const weatherUrlByLocation = ({current_lat, current_lon}) => `http://api.openweathermap.org/data/2.5/weather?lat=${current_lat}&lon=${current_lon}&units=metric&APPID=8e69078d04cbc142a30de0c0456fe417`

const parseResponse = projection({
  temp: 'main.temp',
  description: 'weather.0.description',
  wind: 'wind'
});

function geoFindMe(callback) {


  function success(position) {
    console.log('GOT POSITION: ', position);
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
    callback(null, {current_lat: latitude, current_lon: longitude})
    //changeState({current_lat: latitude, current_lon: longitude});
  }

  function error() {
    console.error('Unable to retrieve your location');
    callback(new Error('Error getting location'))
  }

  if(!navigator.geolocation) {
    console.warn('Geolocation is not supported by your browser')
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }

}

const geoFindMePromise = function() {
  return new Promise((resolve, reject) => {
    geoFindMe((err, data) => {
      if (err) reject(err);
      else resolve(data)
    })
  })
}

const withData = compose(
  withEffect(geoFindMePromise, []),
  branch(prop('getting_loc'), Spinner),
  withStoreState(selectLocation, 'location'),
  withStoreState(selectTemperature, 'tempUnit'),
  fetch(weatherUrlByLocation, parseResponse),
  branch(prop('loading'), Spinner),
)

export default withData(Weather);