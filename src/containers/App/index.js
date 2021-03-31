import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Container from '@material-ui/core/Container';

const Weather = lazy(() => import('../../enhanced/Weather'));
const Settings = lazy(() => import('../../components/Settings'));
const BottomNav = lazy(() => import('../../components/BottomNav'));
const AppBar = lazy(() => import('../../components/AppBar'));

export default function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
      <AppBar />
      <Container maxWidth="sm">
        <Switch>
          <Route path="/settings">
            <Settings />
          </Route>
          <Route path="/">
          <Weather lat="40.416775" lon="-3.703790" />
          </Route>
        </Switch>
      </Container>
      </Suspense>
    </Router>
  );
}
