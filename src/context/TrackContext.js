import createDataContext from './createDataContext'
import trackerApi from '../api/tracker'
import { navigate } from '../navigationRef'

const INITIAL_STATE = { loading: false, tracks: [], error: null }
const trackReducer = (state, action) => {
  switch (action.type) {
    case 'start_fetch':
      return { ...state, loading: true }
    case 'fetch_complete':
      return { ...state, loading: false }
    case 'fetch_tracks':
      return { loading: false, tracks: action.payload }
    case 'fetch_error':
      return {
        ...state,
        loading: false,
        error:
          'System error ...Please make sure you are connected to the internet. Try signing out and signing in ..',
      }
    case 'reset':
      return INITIAL_STATE
    default:
      return state
  }
}

const fetchTracks = (dispatch) => async () => {
  dispatch({ type: 'reset' })
  dispatch({ type: 'start_fetch' })
  try {
    const response = await trackerApi.get('/tracks')
    dispatch({ type: 'fetch_tracks', payload: response.data })
  } catch (err) {
    dispatch({ type: 'fetch_error' })
  }
  dispatch({ type: 'fetch_complete' })
}
const createTrack = (dispatch) => async (name, locations) => {
  await trackerApi.post('/tracks', { name, locations })
}

const deleteTrack = (dispatch) => async (id) => {
  dispatch({ type: 'start_fetch' })
  await trackerApi.post('/tracks/delete', { track_id: id })
  dispatch({ type: 'fetch_complete' })
  navigate('TrackList')
}

export const { Provider, Context } = createDataContext(
  trackReducer,
  { fetchTracks, createTrack, deleteTrack },
  INITIAL_STATE
)
