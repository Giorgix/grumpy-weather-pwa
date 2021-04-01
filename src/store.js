import { configureStore } from '@reduxjs/toolkit';
import temperatureReducer from './redux/temperature/temperatureSlice';
import locationReducer from './redux/location/locationSlice';

export default configureStore({
  reducer: {
    temperature: temperatureReducer,
    location: locationReducer,
  },
});