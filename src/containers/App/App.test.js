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
        },
        loading: true,
        completed: false,
        current_loading: true,
        current_completed: false,
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
      'https://api.openweathermap.org/data/2.5/weather?lat=44&lon=3.5&units=metric&APPID=8e69078d04cbc142a30de0c0456fe417',
      {
        main: {
          temp: 65,
        },
        weather: [
          {
            description: 'clear skies',
          },
        ],
        wind: '30kmh',
        name: 'Madrid centro',
        headers: { 'content-type': 'application/json' },
      },
    );
    render(<App />, { initialState });
    const tempElement = await waitFor(() => screen.getByText(/65/i), { timeout: 3000 });
    const cityElement = await waitFor(() => screen.getByText(/madrid/i), { timeout: 3000 });
    expect(tempElement).toBeInTheDocument();
    expect(cityElement).toBeInTheDocument();
  });
});
