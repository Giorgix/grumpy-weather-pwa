import React, { lazy, Suspense } from "react";
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { compose, isNil, path } from 'ramda';
import { Spinner, NotFound } from '../../components';
import Container from '@material-ui/core/Container';
import { withActionEffect, withDispatcher, withStoreState, branch } from '../../hoc';
import { getCurrentLocation, selectLocation, getGeocode } from '../../redux/location/locationSlice'
const Weather = lazy(() => import('../../enhanced/Weather'));
const Settings = lazy(() => import('../../enhanced/Settings'));
const AppBar = lazy(() => import('../../components/AppBar'));


const ContainerData = () => {
  return (
    <Switch>
    <Route path="/settings">
      <Settings />
    </Route>
    <Route path="/">
      <Weather />
    </Route>
  </Switch>
  )
}

const enhance = compose(
  withDispatcher(useDispatch),
  // The geoposition data could be requested as an effect or an action
  //withAsyncEffect(geoFindMePromise, []),
  withActionEffect(getCurrentLocation, null, null, null),
  withStoreState(selectLocation, 'location'),
  branch(({location}) => location && !location.current_completed, Spinner),
  branch(({location}) => location && isNil(location.data.current_lat), NotFound('We could not get your current location, enable location or search a location on the top bar')),
  withActionEffect(null, getGeocode, ({location}) => location.data, []),
)

const EnhanceContainer = enhance(ContainerData);

export default function App() {
  return (
    <Router>
      <Suspense fallback={<div>Suspense Loading...</div>}>
      <AppBar />
      <Container maxWidth="sm">
        <EnhanceContainer />
      </Container>
      </Suspense>
    </Router>
  );
}
