import React, { lazy, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { compose, isNil } from 'ramda';
import { makeStyles } from '@material-ui/core/styles';
import { Spinner, NotFound, ErrorBoundary } from '../../components';
import SimpleTabs from '../TabMenu';
import Container from '@material-ui/core/Container';
import { withActionEffect, withDispatcher, withStoreState, branch } from '../../hoc';
import { getCurrentLocation, selectLocation, getGeocode } from '../../redux/location/locationSlice';
import theme from '../../theme';
//import Weather from '../../enhanced/Weather';
const Weather = lazy(() => import('../../enhanced/Weather'));
const WeatherTomorrow = lazy(() => import('../../enhanced/WeatherTomorrow'));
const WeatherList = lazy(() => import('../../enhanced/WeatherList'));
const Settings = lazy(() => import('../../enhanced/Settings'));
const AppBar = lazy(() => import('../../components/AppBar'));

const Tomorrow = (props) => {
  return <Spinner />;
};

const tabsItems = [
  { label: 'TODAY', component: Weather },
  { label: 'TOMORROW', component: WeatherTomorrow },
  { label: '7 DAYS', component: WeatherList },
];

const ContainerData = () => {
  return (
    <Switch>
      <Route path="/settings">
        <Settings />
      </Route>
      <Route path="/">
        <SimpleTabs tabs={tabsItems} />
      </Route>
    </Switch>
  );
};

const enhance = compose(
  withDispatcher(useDispatch),
  // The geoposition data could be requested as an effect or an action
  //withAsyncEffect(geoFindMePromise, []),
  withActionEffect(getCurrentLocation, null, null, null),
  withStoreState(selectLocation, 'location'),
  branch(({ location }) => location && !location.current_completed, Spinner),
  branch(
    ({ location }) => location && (!location.data || isNil(location.data.current_lat)),
    NotFound(
      'We could not get your current location, enable location or search a location on the top bar',
    ),
  ),
  withActionEffect(null, getGeocode, ({ location }) => location.data, []),
);

const EnhanceContainer = enhance(ContainerData);

const useStyles = makeStyles({
  root: {
    marginBottom: theme.spacing(2),
  },
});

export default function App() {
  const classes = useStyles();
  return (
    <ErrorBoundary>
      <Router>
        <Suspense fallback={<Spinner />}>
          <AppBar />
          <Container disableGutters={true} className={classes.root} maxWidth="sm">
            <EnhanceContainer />
          </Container>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
}
