// import '../_mockLocation'
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
  const [exit, setExit] = useState(false)

  useEffect(() => {
    if (isFocused) {
      setExit(false)
    }
  }, [isFocused])

  const {
    state: { initialCoords, recording, currentLocation, locations },
    setInitialCoords,
    addLocation,
  } = useContext(LocationContext)

  const callbackInitialCoords = useCallback(
    (location) => {
      setInitialCoords(location)
    },
    [reloadLocation]
  )

  const callbackRecodingCoords = useCallback(
    (location) => {
      addLocation(location, recording)
    },
    [recording]
  )

  // do callback when isFocused, recording or request to reload
  let [errorOnLoadCoords] = useGetLocation(
    isFocused,
    reloadLocation,
    callbackInitialCoords
  )

  // do callback as long recording is true
  let [errorRecordingCoords] = useLocation(recording, callbackRecodingCoords)

  const map = initialCoords ? (
    <Map
      initialCoords={initialCoords}
      currentLocation={currentLocation}
      locations={locations}
      recording={recording}
    />
  ) : null

  return (
    <SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
      <Text h4 style={styles.titleStyle}>
        Create a Track
      </Text>
      {!exit ? (
        <>
          {map}
          {!initialCoords && !errorOnLoadCoords ? (
            <ActivityIndicator size='large' style={{ marginTop: 200 }} />
          ) : null}
          {initialCoords ? <TrackForm /> : null}
          <ErrorModal
            setExit={setExit}
            showModal={!initialCoords && errorOnLoadCoords}
            reload={setReloadLocation}
          />
        </>
      ) : (
        <>
          <Text style={styles.exitTextStyle}>
            Could not load location services, make sure you are connected to the
            internet and allow location services
          </Text>
          <Text style={styles.exitTextStyle}>
            Restart the application or Reload ...
          </Text>
        </>
      )}
    </SafeAreaView>
  )
}

TrackCreateScreen.navigationOptions = {
  title: 'Add Track',
  tabBarIcon: <AntDesign name='pluscircleo' size={24} color='black' />,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  titleStyle: {
    textAlign: 'center',
    margin: 5,
    color: 'gray',
    elevation: 5,
    borderRadius: 10,
  },
  exitTextStyle: {
    marginTop: 40,
    color: 'gray',
    textAlign: 'center',
  },
})

export default withNavigationFocus(TrackCreateScreen)
