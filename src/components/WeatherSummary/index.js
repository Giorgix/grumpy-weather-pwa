import React, { lazy } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import { degreeToCard } from '../../utils';
import theme from '../../theme';
const DateString = lazy(() => import('../Date'));
const Temperature = lazy(() => import('../Temperature'));

const useStyles = makeStyles({
  root: {
    borderBottom: '1px solid #d6d6d6',
  },
  media: {
    height: 140,
  },
  textCenter: {
    textAlign: 'center',
  },
  icon: {
    width: '100%',
    maxWidth: 150,
  },
  collapsable: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    marginBottom: theme.spacing(2),
    width: '100%',
  },
  fullWidth: {
    width: '100%',
  },
});

const WeatherSummary = ({
  description,
  unit,
  temp_max,
  temp_min,
  icon,
  date,
  wind,
  humidity,
  rain_prob,
  sunrise,
  sunset,
}) => {
  const classes = useStyles();

  const dateFormat = {
    hour12: false,
    hour: undefined,
    minute: undefined,
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  };
  const hourFormat = {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  };
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <Grid className={classes.root} container spacing={3}>
      <Grid item xs={12} onClick={handleClick}>
        <Grid container spacing={3} direction="row" justify="center" alignItems="center">
          <Grid item xs={7}>
            <Typography gutterBottom component="h2" variant="subtitle2" color="textSecondary">
              {description}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              <DateString date={date * 1000} prefix="" format={dateFormat} />
            </Typography>
          </Grid>
          <Grid
            item
            container
            className={classes.textCenter}
            xs={5}
            spacing={3}
            direction="row"
            justify="flex-end"
            alignItems="center"
          >
            <Grid item xs={8}>
              <img className={classes.icon} alt={description} src={icon} />
            </Grid>
            <Grid item xs={4}>
              <Typography variant="caption" component="span">
                <Box>
                  <Temperature degrees={temp_max} unitType={unit} showUnit={false} />
                </Box>
                <Box>
                  <Temperature degrees={temp_min} unitType={unit} showUnit={false} />
                </Box>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Collapse in={open} timeout="auto" className={classes.fullWidth}>
        <Grid className={classes.collapsable} item xs={12}>
          <Grid container spacing={1} direction="row" justify="center" alignItems="center">
            <Grid item xs={6}>
              <Typography variant="caption" color="textSecondary" component="p">
                Wind:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption" color="textSecondary" component="p">
                {Math.round(wind.speed * 3.6)} km/h {degreeToCard(wind.deg)}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption" color="textSecondary" component="p">
                Humidity:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption" color="textSecondary" component="p">
                {humidity}%
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption" color="textSecondary" component="p">
                Chance of rain:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption" color="textSecondary" component="p">
                {rain_prob}%
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption" color="textSecondary" component="p">
                Sunrise/sunset:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption" color="textSecondary" component="p">
                <DateString type="time" date={sunrise * 1000} prefix="" format={hourFormat} />,{' '}
                <DateString type="time" date={sunset * 1000} prefix="" format={hourFormat} />
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Collapse>
    </Grid>
  );
};

WeatherSummary.propTypes = {
  temp: PropTypes.number,
  temp_min: PropTypes.number,
  temp_max: PropTypes.number,
  description: PropTypes.string,
  icon: PropTypes.string,
  unit: PropTypes.string,
  updatedAt: PropTypes.number,
  date: PropTypes.number,
  sunrise: PropTypes.number,
  sunset: PropTypes.number,
  wind: PropTypes.shape({
    speed: PropTypes.number,
    deg: PropTypes.number,
  }),
  humidity: PropTypes.number,
  rain_prob: PropTypes.number,
};

export default WeatherSummary;
