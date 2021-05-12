import { curry, is, map, path } from 'ramda';

const { entries } = Object;
const { random, trunc } = Math;

export const isFunction = is(Function);

export const mapKeys = curry((f, o) => {
  return entries(o).reduce((mapped, [key, value]) => {
    return { ...mapped, [f(key)]: value };
  }, {});
});

export const projection = curry((descriptor, obj) => {
  return map((getter) => {
    return isFunction(getter) ? getter(obj) : path(getter.split('.'), obj);
  }, descriptor);
});

export const randomNumber = (min, max) => {
  return trunc(random() * (max - min) + min);
};

export const delay = (t) => new Promise((resolve) => setTimeout(resolve, t));

const geoFindMe = (callback) => {
  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    callback(null, { current_lat: latitude, current_lon: longitude });
    //changeState({current_lat: latitude, current_lon: longitude});
  }

  function error() {
    console.error('Unable to retrieve your location');
    callback(new Error('Error getting location'));
  }

  if (!navigator.geolocation) {
    //console.warn('Geolocation is not supported by your browser')
    callback(new Error('Geolocation is not supported by your browser'));
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }
};

export const geoFindMePromise = function () {
  return new Promise((resolve, reject) => {
    geoFindMe((err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

export const degreeToCard = (value) => {
  value = parseFloat(value);
  if (value <= 11.25) return 'N';
  value -= 11.25;
  let allDirections = [
    'NNE',
    'NE',
    'ENE',
    'E',
    'ESE',
    'SE',
    'SSE',
    'S',
    'SSW',
    'SW',
    'WSW',
    'W',
    'WNW',
    'NW',
    'NNW',
    'N',
  ];
  let dIndex = parseInt(value / 22.5);
  return allDirections[dIndex] ? allDirections[dIndex] : 'N';
};

export const checkSameLocation = (locationA, locationB) => {
  console.log('previous location: ', locationA);
  console.log('new location: ', locationB);
  return locationA && locationB
    ? locationA.current_lat === locationB.current_lat &&
        locationA.current_lon === locationB.current_lon
    : false;
};

export const checkTimeDiffFromNow = (pastTime, threshold) => {
  const now = Date.now();
  const timeDiff = Math.round(now - pastTime) / 1000; //in ms
  console.log(`Time diff: ${timeDiff} seconds. Threshold: ${threshold}`);
  return timeDiff < threshold;
};
