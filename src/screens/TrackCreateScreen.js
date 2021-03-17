import '../_mockLocation'
import React, { useContext, useCallback, useState, useEffect } from 'react'
import {
  SafeAreaView,
  withNavigationFocus,
  NavigationEvents,
  TabRouter,
} from 'react-navigation'
import { StyleSheet, ActivityIndicator, View } from 'react-native'
import { Text } from 'react-native-elements'
import Map from '../components/Map'
import { Context as LocationContext } from '../context/LocationContext'
import { useGetLocation, useLocation } from '../hooks/useLocation'
import TrackForm from '../components/TrackForm'
import ErrorModal from '../components/ReloadModal'
import { FontAwesome5 } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const TrackCreateScreen = ({ isFocused }) => {
  const [reloadLocation, setReloadLocation] = useState(false)

  const {
    state: { initialCoords, recording, currentLocation, locations },
    setInitialCoords,
    addLocation,
  } = useContext(LocationContext)

  const callbackInitialCoords = useCallback((location) => {
    setInitialCoords(location)
  }, [])

  const callbackRecodingCoords = useCallback(
    (location) => {
      addLocation(location, recording)
    },
    [recording]
  )

  // do callback when isFocused, recording or request to reload
  const [errorOnLoadCoords] = useGetLocation(
    isFocused,
    reloadLocation,
    callbackInitialCoords
  )

  // do callback as long recording is true
  const [errorRecordingCoords] = useLocation(recording, callbackRecodingCoords)

  const map = initialCoords ? (
    <Map
      initialCoords={initialCoords}
      currentLocation={currentLocation}
      locations={locations}
      recording={recording}
    />
  ) : (
    <ActivityIndicator size='large' style={{ marginTop: 200 }} />
  )

  let onError = errorOnLoadCoords ? (
    <ErrorModal showModal={true} reload={setReloadLocation} />
  ) : null

  return (
    <SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
      <Text h4 style={styles.titleStyle}>
        Create a Track
      </Text>
      {onError}
      {map}
      <View style={styles.form}>
        <TrackForm />
      </View>
    </SafeAreaView>
  )
}

TrackCreateScreen.navigationOptions = {
  title: 'Add Track',
  tabBarIcon: <AntDesign name='pluscircleo' size={24} color='black' />,
}

const styles = StyleSheet.create({
  container: {},
  titleStyle: {
    textAlign: 'center',
    margin: 5,
    color: 'gray',
    elevation: 5,
    borderRadius: 10,
  },
})

export default withNavigationFocus(TrackCreateScreen)
