import React, { lazy } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import weatherBg from './weather-bg.jpg'; // Tell webpack this JS file uses this image
import theme from '../../theme';
const DateData = lazy(() => import('../Date'));

const useStyles = makeStyles({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  media: {
    height: 140,
  },
});

export default function Weather({weather, location}) {
  const classes = useStyles();
  console.log('weather date: ', weather.updatedAt)
  return (
      <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={weatherBg}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Current temp in {location.name} is {weather.data.temp} {weather.unit === 'metric'? 'ºC' : 'ºF'}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            The feeling is {weather.data.description}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <DateData date={weather.updatedAt} prefix="Updated at:" />
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
  )
}
