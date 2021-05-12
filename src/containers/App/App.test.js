import React from 'react';
import { waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import { render, fireEvent, screen } from '../../test-utils';
import App from '.';

describe('App', () => {
  afterEach(() => {
    fetchMock.restore();
  });
  const initialState = {
    location: {
      value: {
        data: {
          current_lat: 44,
          current_lon: 3.4,
          name: 'Madrid',
        },
        loading: true,
        completed: false,
        current_loading: true,
        current_completed: false,
      },
    },
    weather: {
      value: {
        loading: true,
        completed: false,
        updatedAt: 123123123,
        unit: 'metric',
      },
    },
  };
  let store, wrapper;

  it('Shows Spinner on first load', () => {
    render(<App />, { initialState });

    expect(screen.getAllByTestId('skeleton')).not.toBeNull();
  });
  it('Shows Weather after loading', async () => {
    fetchMock.get(
      'https://api.opencagedata.com/geocode/v1/json?q=44+3.4&key=f62e33ffb4294e3cb537350fde241077',
      {
        results: [
          {
            geometry: {
              lat: 44,
              lng: 3.5,
            },
            components: {
              city: 'Madrid',
              quarter: 'Goya',
            },
          },
        ],
        headers: { 'content-type': 'application/json' },
      },
    );
    fetchMock.get(
      'https://api.openweathermap.org/data/2.5/onecall?lat=44&lon=3.4&exclude=minutely&units=metric&APPID=8e69078d04cbc142a30de0c0456fe417',
      {
        hourly: [
          {
            dt: 1620036000,
            temp: 13.09,
            feels_like: 12,
            pressure: 1019,
            humidity: 59,
            dew_point: 5.39,
            uvi: 4.26,
            clouds: 100,
            visibility: 10000,
            wind_speed: 4,
            wind_deg: 98,
            wind_gust: 5.47,
            weather: [
              {
                id: 804,
                main: 'Clouds',
                description: 'overcast clouds',
                icon: '04d',
              },
            ],
            pop: 0.08,
          },
        ],
        daily: [
          {
            dt: 1619870400,
            sunrise: 1619846031,
            sunset: 1619896185,
            moonrise: 1619825640,
            moonset: 1619858580,
            moon_phase: 0.66,
            temp: {
              day: 65,
              min: 8.08,
              max: 15.76,
              night: 11.81,
              eve: 14.39,
              morn: 8.45,
            },
            feels_like: {
              day: 14.19,
              night: 8.45,
              eve: 12.96,
              morn: 8.45,
            },
            pressure: 1012,
            humidity: 39,
            dew_point: 1.67,
            wind_speed: 6.48,
            wind_deg: 254,
            wind_gust: 5.7,
            weather: [
              {
                id: 802,
                main: 'Clouds',
                description: 'scattered clouds',
                icon: '03d',
              },
            ],
            clouds: 40,
            pop: 0.23,
            uvi: 7.18,
          },
        ],
      },
    );
    render(<App />, { initialState });
    const tempElement = await waitFor(() => screen.getByText(/65/i), { timeout: 3000 });
    const cityElement = await waitFor(() => screen.getByText(/madrid/i), { timeout: 3000 });
    expect(tempElement).toBeInTheDocument();
    expect(cityElement).toBeInTheDocument();
  });
});
