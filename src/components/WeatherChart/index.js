import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../../theme';

const useStyles = makeStyles({
  container: {
    overflow: 'scroll',
    marginTop: '2rem',
  },
  chart: {
    minHeight: '200px',
    minWidth: '300px',
    backgroundColor: theme.palette.primary.main,
    paddingBottom: '1rem',
  },
  label: {
    fontSize: '0.45rem',
    fontWeight: '700',
    fontFamily: 'sans-serif',
    fill: '#FEFEFE',
    textAnchor: 'middle',
  },
});

const parseHours = (hourlyData) => {
  const hour = hourlyData.dt * 1000;
  const formattedHour =
    hour && new Date(hour).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  return formattedHour;
};
const parseTemps = (unitType) => (hourlyData) => {
  const temp = hourlyData.temp;
  const formattedTemp = unitType === 'metric' ? Math.round(temp) : Math.round((temp * 9) / 5 + 32);
  return formattedTemp;
};
const parseIcons = (hourlyData) => {
  const icon = (hourlyData.weather[0] || {}).icon;
  return icon;
};

const calculatePoints = (points, unitType) => {
  console.log('POINTS: ', points);
  let data = '00, 110';
  points.forEach((point, index) => {
    let x = index > 0 ? 30 * index + 10 : 0;
    if (index === points.length - 1) {
      x += 20;
    }
    data = data.concat(' ', `${x}, ${unitType === 'metric' ? 75 - point : 125 - point}`);
  });
  // '00,62 40,60 70,68 100,68 130,71 160,74 200,74'
  data = data.concat(' ', `${30 * points.length}, 110`);
  console.log('FINAL LINE DATA: ', data);
  return data;
};

function WeatherChart({ data, unitType }) {
  const classes = useStyles();
  console.log('chart data: ', data);
  const hours = data.map(parseHours);
  const temps = data.map(parseTemps(unitType));
  const icons = data.map(parseIcons);
  console.log('hours: ', hours);
  console.log('temps: ', temps);
  console.log('icons: ', icons);
  return (
    <div className={classes.container}>
      <svg
        width={60 * temps.length}
        className={classes.chart}
        viewBox={`0 0 ${30 * temps.length} 120`}
        overflow="auto"
      >
        <polyline
          fill={theme.palette.secondary.main}
          stroke={theme.palette.secondary.main}
          strokeWidth="1"
          points={calculatePoints(temps, unitType)}
        />
        <g className={classes.label}>
          {hours.map((hour, i) => {
            const x = i > 0 ? 30 * i + 10 : 10;
            return (
              <text x={x} y="120" key={i}>
                {hour}
              </text>
            );
          })}
        </g>
        <g className={classes.label}>
          {temps.map((temp, i) => {
            const x = i > 0 ? 30 * i + 10 : 10;
            return (
              <text x={x} y={unitType === 'metric' ? 70 - temp : 120 - temp} key={i}>
                º{temp}
              </text>
            );
          })}
        </g>
        <g className={classes.label}>
          {icons.map((icon, i) => {
            const x = i > 0 ? 30 * i : 0;
            return (
              <image
                key={i}
                href={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                x={x}
                y="90"
                height="20px"
                width="20px"
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
}

WeatherChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      dt: PropTypes.number,
      temp: PropTypes.number,
    }),
  ),
  unitType: PropTypes.string,
};

export default WeatherChart;
