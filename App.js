import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import AccountScreen from './src/screens/AccountScreen'
import SignInScreen from './src/screens/SignInScreen'
import SignUpScreen from './src/screens/SignUpScreen'
import TrackCreateScreen from './src/screens/TrackCreateScreen'
import TrackDetailScreen from './src/screens/TrackDetailScreen'
import TrackListScreen from './src/screens/TrackListScreen'
import { Provider as AuthProvider } from './src/context/AuthContext'
import { setNavigator } from './src/navigationRef'
import ResolveAuthScreen from './src/screens/ResolveAuthScreen'
import { Provider as LocationProvider } from './src/context/LocationContext'
import { Provider as TrackProvider } from './src/context/TrackContext'
import { FontAwesome5 } from '@expo/vector-icons'

const trackListFlow = createStackNavigator({
  TrackList: TrackListScreen,
  TrackDetail: TrackDetailScreen,
})

trackListFlow.navigationOptions = {
  title: 'My Tracks',
  tabBarIcon: <FontAwesome5 name='list-alt' size={24} color='black' />,
  backgroundColor: 'black',
}

const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  loginFlow: createStackNavigator({
    SignIn: SignInScreen,
    SignUp: SignUpScreen,
  }),
  mainFlow: createBottomTabNavigator({
    trackListFlow,
    TrackCreate: TrackCreateScreen,
    Account: AccountScreen,
  }),
})

const App = createAppContainer(switchNavigator)

export default () => {
  return (
    <TrackProvider>
      <LocationProvider>
        <AuthProvider>
          <App ref={(navigator) => setNavigator(navigator)} />
        </AuthProvider>
      </LocationProvider>
    </TrackProvider>
  )
}
