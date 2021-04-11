import { render, screen, waitFor } from '@testing-library/react';
import React, { Suspense } from 'react';
import WeatherSummary from '.';

describe('WeatherSummary', () => {
  it('rendered lazily', async () => {
    const props = {
      description: 'cloudy',
      unit: 'metric',
      temp_max: 61,
      temp_min: -1,
      icon: '40d',
      date: 123456789,
      wind: {
        speed: 134,
        deg: 45,
      },
      feels_like: 35,
    };
    const screen = render(
      <Suspense fallback={<div>loading...</div>}>
        <WeatherSummary {...props} />
      </Suspense>,
    );

    const descriptionElement = await waitFor(() => screen.getByText(/cloud/i));
    const tempMaxElement = await waitFor(() => screen.getByText(/61/i));
    const tempMinElement = await waitFor(() => screen.getByText(/-1/i));
    const iconElement = await waitFor(() => screen.getByAltText('cloudy'));
    const windElement = await waitFor(() => screen.getByText(/km\/h /i));
    expect(descriptionElement).toBeInTheDocument();
    expect(tempMaxElement).toBeInTheDocument();
    expect(tempMinElement).toBeInTheDocument();
    expect(iconElement).toBeInTheDocument();
    expect(windElement).toBeInTheDocument();
  });
});
