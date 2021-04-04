import { lazy } from "react";
import { useDispatch } from 'react-redux'
import { withHandlers, withStoreState, withDispatcher, withAction } from '../../hoc';
import { compose } from 'ramda';
import {
  switchUnit,
  selectWeatherUnit
} from '../../redux/weather/weatherSlice'

const Settings = lazy(() => import('../../components/Settings'));
const enhanced = compose(
  withStoreState(selectWeatherUnit, 'tempUnit'),
  withDispatcher(useDispatch),
  withHandlers({
    changeTempUnit: ({dispatcher}) => () => dispatcher(switchUnit())
  })
)

export default enhanced(Settings);


