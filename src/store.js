import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import weatherReducer from './redux/weather/weatherSlice';
import locationReducer from './redux/location/locationSlice';

const weatherPersistConfig = {
  key: 'weather',
  storage,
  blacklist: ['loading', 'completed']
}
const rootReducer = combineReducers({
  // use "temperature and/or location" to persist these slices
  weather: weatherReducer,
  location: locationReducer,
})
const persistConfig = {
  key: 'root',
  storage
}


const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store)

export default store;