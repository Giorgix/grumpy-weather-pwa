import React, { lazy } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import weatherBg from './weather-bg.jpg'; // Tell webpack this JS file uses this image
import theme from '../../theme';
const DateString = lazy(() => import('../Date'));
const Temperature = lazy(() => import('../Temperature'));
const WeatherChart = lazy(() => import('../WeatherChart'));

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.primary.main,
    color: '#FEFEFE',
  },
  padded: {
    padding: '1rem',
  },
  media: {
    height: 140,
  },
  textCenter: {
    textAlign: 'center',
  },
  textWhite: {
    color: '#FEFEFE',
  },
  icon: {
    width: '100%',
    maxWidth: 150,
  },
});

const Weather = ({
  weather,
  location,
  showDate = true,
  dateFormat = {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: 'long',
  },
}) => {
  const classes = useStyles();
  // TODO filter hourly data array to have only from time.now until 6am
  console.log('WEATHER DATA: ', weather);
  const chartData = weather.hourly;
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} className={classes.padded}>
        <Typography
          className={`${classes.textCenter} ${classes.textWhite}`}
          gutterBottom
          variant="h5"
          color="textSecondary"
        >
          {weather.data.description}
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        spacing={3}
        sm
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.padded}
      >
        <Grid item xs={6}>
          <Typography variant="caption" component="span">
            Day{' '}
            <Temperature degrees={weather.data.temp_max} unitType={weather.unit} showUnit={false} />
            <span>&#8593;</span> &#8226; Night{' '}
            <Temperature degrees={weather.data.temp_min} unitType={weather.unit} showUnit={false} />
            <span>&#8595;</span>
          </Typography>
          <Typography variant="h3" component="h2">
            <Temperature degrees={weather.data.temp} unitType={weather.unit} />
          </Typography>
        </Grid>
        <Grid className={classes.textCenter} item xs={6}>
          <img className={classes.icon} alt={weather.data.description} src={weather.data.icon} />
        </Grid>
      </Grid>
      <Grid item xs={12} className={classes.padded}>
        <Typography component="p">{location.data.name}</Typography>
        {showDate && (
          <Typography
            className={classes.textWhite}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            <DateString date={weather.updatedAt} prefix="" format={dateFormat} />
          </Typography>
        )}
      </Grid>
      <Grid item xs={12}>
        <WeatherChart data={chartData} unitType={weather.unit} />
      </Grid>
    </Grid>
  );
};

Weather.propTypes = {
  weather: PropTypes.shape({
    data: PropTypes.shape({
      temp: PropTypes.number,
      description: PropTypes.string,
      icon: PropTypes.string,
    }),
    unit: PropTypes.string,
    updatedAt: PropTypes.number,
  }),
  location: PropTypes.shape({
    data: PropTypes.shape({
      name: PropTypes.string,
    }),
  }),
  showDate: PropTypes.bool,
};

export default Weather;
