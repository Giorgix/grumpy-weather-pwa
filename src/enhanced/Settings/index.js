import { lazy } from "react";
import { useDispatch } from 'react-redux'
import { withHandlers, withStoreState, withDispatcher } from '../../hoc';
import { compose } from 'ramda';
import {
  switchUnit,
  selectTemperature
} from '../../redux/temperature/temperatureSlice'

const Settings = lazy(() => import('../../components/Settings'));
const enhanced = compose(
  withStoreState(selectTemperature, 'tempUnit'),
  withDispatcher(useDispatch),
  withHandlers({
    changeTempUnit: ({dispatcher}) => () => dispatcher(switchUnit())
  })
)

export default enhanced(Settings);


