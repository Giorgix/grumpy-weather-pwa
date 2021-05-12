import { render, screen, waitFor } from '@testing-library/react';
import React, { Suspense } from 'react';
import Weather from '.';

describe('Weather', () => {
  it('rendered lazily', async () => {
    const props = {
      location: {
        data: {
          name: 'Madrid',
        },
      },
      weatherData: {
        data: {
          temp: 30,
          description: 'clear skies',
        },
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
        unit: 'metric',
        updatedAt: 123123123,
      },
    };
    const screen = render(
      <Suspense fallback={<div>loading...</div>}>
        <Weather location={props.location} weather={props.weatherData} />
      </Suspense>,
    );

    const locationElement = await waitFor(() => screen.getByText(/madrid/i));
    const tempElement = await waitFor(() => screen.getByText(/30/i));
    const unitElement = await waitFor(() => screen.getByText(/ºC/i));
    expect(locationElement).toBeInTheDocument();
    expect(tempElement).toBeInTheDocument();
    expect(unitElement).toBeInTheDocument();
  });
});
