import React, { lazy, Suspense } from "react";
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { compose } from 'ramda';
import Container from '@material-ui/core/Container';
import { withAction, withDispatcher } from '../../hoc';
import { getLocation } from '../../redux/location/locationSlice'
const Weather = lazy(() => import('../../enhanced/Weather'));
const Settings = lazy(() => import('../../enhanced/Settings'));
const AppBar = lazy(() => import('../../components/AppBar'));

const App =  function App() {
  return (
    <Router>
      <Suspense fallback={<div>Suspense Loading...</div>}>
      <AppBar />
      <Container maxWidth="sm">
        <Switch>
          <Route path="/settings">
            <Settings />
          </Route>
          <Route path="/">
            <Weather />
          </Route>
        </Switch>
      </Container>
      </Suspense>
    </Router>
  );
}

const enhance = compose(
  withDispatcher(useDispatch),
  withAction(getLocation, false, false),
)

export default enhance(App)
