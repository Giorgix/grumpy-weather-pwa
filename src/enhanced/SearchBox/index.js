import { lazy } from "react";
import { useDispatch } from 'react-redux'
import { withHandlers, withStoreState, withDispatcher, withAction } from '../../hoc';
import { compose } from 'ramda';
import {
  selectWeather
} from '../../redux/weather/weatherSlice'
import {
  getGeocode,
  selectLocation
} from '../../redux/location/locationSlice'

const SearchBox = lazy(() => import('../../components/SearchBox'));
const enhanced = compose(
  withStoreState(selectLocation, 'location'),
  withDispatcher(useDispatch),
  withHandlers({
    searchLocation: ({dispatcher}) => (location) => dispatcher(getGeocode(location))
  })
)

export default enhanced(SearchBox);


