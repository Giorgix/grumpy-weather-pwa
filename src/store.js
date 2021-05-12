import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createFilter, createBlacklistFilter } from 'redux-persist-transform-filter';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import weatherReducer from './redux/weather/weatherSlice';
import locationReducer from './redux/location/locationSlice';

// you want to store only a subset of your state of reducer one
const saveLocationFilter = createFilter('location', [
  'value.data',
  'value.hasGeoLocation',
  'value.previous_location',
]);
const saveWeatherFilter = createBlacklistFilter('weather', ['value.loading', 'value.completed']);

const rootReducer = combineReducers({
  // use "temperature and/or location" to persist these slices
  weather: weatherReducer,
  location: locationReducer,
});
const persistConfig = {
  key: 'root',
  storage,
  transforms: [saveLocationFilter, saveWeatherFilter],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);

export default store;
