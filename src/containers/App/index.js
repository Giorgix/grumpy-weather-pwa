import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Container from '@material-ui/core/Container';

const Weather = lazy(() => import('../../enhanced/Weather'));
const Settings = lazy(() => import('../../enhanced/Settings'));
const AppBar = lazy(() => import('../../components/AppBar'));

export default function App() {
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
          <Weather test="testing" />
          </Route>
        </Switch>
      </Container>
      </Suspense>
    </Router>
  );
}
