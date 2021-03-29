import logo from '../../logo.svg';
import './styles.css';
import { Weather, Spinner } from '../../components';
import { fetch, branch  } from '../../hoc';
import { compose, pipe, prop, replace, isEmpty } from 'ramda';
import { projection } from '../../utils';

const weatherUrlByLocation = ({lat, lon}) =>
  `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&APPID=8e69078d04cbc142a30de0c0456fe417`

const parseResponse = projection({
  temp: 'main.temp',
  description: 'weather.0.description',
  wind: 'wind'
});

const withData = compose(
  fetch(weatherUrlByLocation, parseResponse),
  branch(prop('loading'), Spinner)
)

const WeatherContainer = withData(Weather);

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Grumpy Weather
        </p>
      </header>
      <WeatherContainer lat="10" lon="20" />
    </div>
  );
}
