import { AsyncStorage } from 'react-native'
import createDataContext from './createDataContext'
import trackerApi from '../api/tracker'
import { navigate } from '../navigationRef'

const INITIAL_STATE = {
  token: null,
  errorMessage: '',
  loading: false,
}

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return { ...state, errorMessage: action.payload, loading: false }
    case 'signup':
      return {
        ...state,
        token: action.payload,
        errorMessage: null,
        loading: false,
      }
    case 'signin':
      return {
        ...state,
        token: action.payload,
        errorMessage: null,
        loading: false,
      }
    case 'loading':
      return {
        ...state,
        loading: action.payload,
        errorMessage: null,
      }
    case 'signout':
      return {
        ...state,
        token: null,
      }
    case 'delete_account':
      return INITIAL_STATE
    case 'clear':
      return {
        ...state,
        loading: false,
        errorMessage: null,
      }
    default:
      return state
  }
}

const tryLocalSignIn = (dispatch) => async () => {
  const token = await AsyncStorage.getItem('token')
  if (token) {
    dispatch({ type: 'signin', payload: token })
    navigate('mainFlow')
  } else {
    navigate('SignIn')
  }
}

const signUp = (dispatch) => async ({ email, password }) => {
  dispatch({ type: 'loading', payload: true })
  try {
    const response = await trackerApi.post('/signup', {
      email,
      password,
    })
    await AsyncStorage.setItem('token', response.data.token)
    dispatch({ type: 'signup', payload: response.data.token })
    navigate('mainFlow')
  } catch (err) {
    dispatch({
      type: 'add_error',
      payload: 'Invalid or email already exist',
    })
  }
}

const signIn = (dispatch) => async ({ email, password }) => {
  dispatch({ type: 'loading', payload: true })
  try {
    const response = await trackerApi.post('/signin', { email, password })
    await AsyncStorage.setItem('token', response.data.token)
    dispatch({ type: 'signin', payload: response.data.token })
    navigate('TrackList')
  } catch (err) {
    dispatch({
      type: 'add_error',
      payload: 'Invalid email or password ',
    })
  }
}

const signOut = (dispatch) => async () => {
  await AsyncStorage.clear()
  dispatch({ type: 'signout' })
  navigate('ResolveAuth')
}

const deleteAccount = (dispatch) => async () => {
  try {
    const token = await AsyncStorage.getItem('token')
    dispatch({
      type: 'delete_account',
    })
    const response = await trackerApi.post('/deleteaccount')
    await AsyncStorage.clear()
    navigate('ResolveAuth')
  } catch (err) {}
}

const clearState = (dispatch) => () => {
  dispatch({ type: 'clear' })
}

export const { Provider, Context } = createDataContext(
  authReducer,
  { signIn, signUp, signOut, clearState, tryLocalSignIn, deleteAccount },
  INITIAL_STATE
)
