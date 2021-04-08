import React, { lazy } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
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
});

const Weather = ({ weather, location }) => {
  const classes = useStyles();

  return (
    <Card>
      <CardActionArea>
        <CardMedia className={classes.media} image={weatherBg} title="Contemplative Reptile" />
        <CardContent>
          <Typography gutterBottom component="p">
            {location.data.name}
          </Typography>
          <Typography gutterBottom variant="h3" component="h2">
            <Temperature degrees={weather.data.temp} unitType={weather.unit} />
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            The feeling is {weather.data.description}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <DateString date={weather.updatedAt} prefix="Updated at:" />
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
