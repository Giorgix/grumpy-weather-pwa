import React, { lazy } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import weatherBg from './weather-bg.jpg'; // Tell webpack this JS file uses this image
const DateString = lazy(() => import('../Date'));
const Temperature = lazy(() => import('../Temperature'));

const useStyles = makeStyles({
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
});

const Weather = ({ weather, location }) => {
  const classes = useStyles();

  return (
    <Card>
      <CardActionArea>
        <CardMedia className={classes.media} image={weatherBg} title="Contemplative Reptile" />
        <CardContent>
          <Typography
            className={classes.textCenter}
            gutterBottom
            variant="h5"
            color="textSecondary"
          >
            {weather.data.description}
          </Typography>
          <Grid container spacing={3} direction="row" justify="center" alignItems="center">
            <Grid item xs={6}>
              <Typography variant="caption" component="span">
                Day{' '}
                <Temperature
                  degrees={weather.data.temp_max}
                  unitType={weather.unit}
                  showUnit={false}
                />
                <span>&#8593;</span> &#8226; Night{' '}
                <Temperature
                  degrees={weather.data.temp_min}
                  unitType={weather.unit}
                  showUnit={false}
                />
                <span>&#8595;</span>
              </Typography>
              <Typography variant="h3" component="h2">
                <Temperature degrees={weather.data.temp} unitType={weather.unit} />
              </Typography>
            </Grid>
            <Grid className={classes.textCenter} item xs={6}>
              <img
                className={classes.icon}
                alt={weather.data.description}
                src={weather.data.icon}
              />
            </Grid>
          </Grid>
          <Typography component="p">{location.data.name}</Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <DateString date={weather.updatedAt} prefix="" />
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
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
};

export default Weather;
