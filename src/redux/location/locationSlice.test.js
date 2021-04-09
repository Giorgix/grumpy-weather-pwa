import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { getGeocode, getCurrentLocation } from './locationSlice';
import fetchMock from 'fetch-mock'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('location slice', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  it('creates location/setLocationInfo when fetching geoCode data has been done', () => {
    fetchMock.get('https://api.opencagedata.com/geocode/v1/json?q=44+3.5&key=f62e33ffb4294e3cb537350fde241077', {
      results: [
        {
          geometry: {
            lat: 44,
            lng: 3.5
          },
          components: {
            city: 'Madrid',
            quarter: 'Goya'
          }
        }
      ],
      headers: { 'content-type': 'application/json' }
    })

    const expectedActions = [
      { type: 'location/initGetLocationInfo' },
      { type: 'weather/setWeatherLoading' },
      { type: 'location/setLocationInfo', payload: {
        current_lat: 44,
        current_lon: 3.5,
        name: 'Goya, Madrid'
      } }
    ]
    const store = mockStore({ location: [] })
    const newThunk = getGeocode({current_lat: 44, current_lon: 3.5})
    return store.dispatch(newThunk).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
  it('creates location/setLocationInfoError when fetching geoCode data has failed', () => {
    fetchMock.get('https://api.opencagedata.com/geocode/v1/json?q=44+3.5&key=f62e33ffb4294e3cb537350fde241077', 400)

    const expectedActions = [
      { type: 'location/initGetLocationInfo' },
      { type: 'weather/setWeatherLoading' },
      { type: 'location/setLocationInfoError', payload: 'Error getting location info :(' }
    ]
    const store = mockStore({ location: [] })
    const newThunk = getGeocode({current_lat: 44, current_lon: 3.5})
    return store.dispatch(newThunk).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})