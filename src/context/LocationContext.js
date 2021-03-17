import { AsyncStorage, RecyclerViewBackedScrollView } from 'react-native'
import createDataContext from './createDataContext'

const INITIAL_STATE = {
  name: '',
  recording: false,
  initialCoords: null,
  locations: [],
  currentLocation: null,
}

const locationReducer = (state, action) => {
  switch (action.type) {
    case 'add_current_location':
      return { ...state, currentLocation: action.payload }
    case 'start_recording':
      return { ...state, recording: true }
    case 'stop_recording':
      return { ...state, recording: false }
    case 'add_location':
      return { ...state, locations: [...state.locations, action.payload] }
    case 'change_name':
      return { ...state, name: action.payload }
    case 'reset':
      return INITIAL_STATE
    case 'set_initial_region':
      return { ...state, initialCoords: action.payload }
    default:
      return state
  }
}

const startRecording = (dispatch) => () => {
  dispatch({ type: 'start_recording' })
}
const stopRecording = (dispatch) => () => {
  dispatch({ type: 'stop_recording' })
}
const addLocation = (dispatch) => (location, recording) => {
  dispatch({ type: 'add_current_location', payload: location })
  if (recording) {
    dispatch({ type: 'add_location', payload: location })
  }
}

const changeName = (dispatch) => (name) => {
  dispatch({ type: 'change_name', payload: name })
}

const reset = (dispatch) => () => {
  console.log('reset called ')
  dispatch({ type: 'reset' })
}

const setInitialCoords = (dispatch) => (initialCoords) => {
  dispatch({ type: 'set_initial_region', payload: initialCoords })
}

export const { Context, Provider } = createDataContext(
  locationReducer,
  {
    setInitialCoords,
    startRecording,
    stopRecording,
    addLocation,
    changeName,
    reset,
  },
  INITIAL_STATE
)
