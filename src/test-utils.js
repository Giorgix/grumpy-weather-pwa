// test-utils.js
import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { combineReducers, createStore, applyMiddleware } from '@reduxjs/toolkit';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
// Import your own reducer
import weatherReducer from './redux/weather/weatherSlice';
import locationReducer from './redux/location/locationSlice';

const middlewares = [thunk]
const rootReducer = combineReducers({
  // use "temperature and/or location" to persist these slices
  weather: weatherReducer,
  location: locationReducer,
})

function render(
  ui,
  {
    initialState,
    store = createStore(rootReducer, initialState, applyMiddleware(thunk)),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react'
// override render method
export { render }