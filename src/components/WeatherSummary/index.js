import React, { lazy } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
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

const Weather = ({ description, unit, temp_max, temp_min, temp, icon, date, wind, feels_like }) => {
  const classes = useStyles();

  const dateFormat = {
    hour12: false,
    hour: undefined,
    minute: undefined,
    day: '2-digit',
    month: 'long',
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
          <Grid container spacing={3} direction="row" justify="center" alignItems="center">
            <Grid item xs={7}>
              <Typography variant="caption" color="textSecondary" component="p">
                Wind: {wind.speed} metre/sec
              </Typography>
              <Typography variant="caption" color="textSecondary" component="p">
                Direction: {wind.deg}º
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography variant="caption" component="span">
                Feels like: <Temperature degrees={feels_like} unitType={unit} showUnit={false} />
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Collapse>
    </Grid>
  );
};

Weather.propTypes = {
  weather: PropTypes.shape({
    temp: PropTypes.number,
    temp_min: PropTypes.number,
    temp_max: PropTypes.number,
    description: PropTypes.string,
    icon: PropTypes.string,
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
