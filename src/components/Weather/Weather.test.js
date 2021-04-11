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
