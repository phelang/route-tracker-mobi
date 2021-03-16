import '../_mockLocation'
import React, { useContext, useCallback, useState, useEffect } from 'react'
import {
  SafeAreaView,
  withNavigationFocus,
  NavigationEvents,
} from 'react-navigation'
import { StyleSheet, ActivityIndicator } from 'react-native'
import { Text } from 'react-native-elements'
import Map from '../components/Map'
import { Context as LocationContext } from '../context/LocationContext'
import { getLocation, useLocation } from '../hooks/useLocation'
import TrackForm from '../components/TrackForm'

const TrackCreateScreen = ({ isFocused }) => {
  const {
    state: { initialCoords, recording, locations },
    setInitialCoords,
    addLocation,
  } = useContext(LocationContext)

  const callbackInitialCoords = useCallback(
    (location) => {
      console.log('location ', location)
      setInitialCoords(location)
    },
    [isFocused]
  )

  const callbackRecodingCoords = useCallback(
    (location) => {
      addLocation(location, recording)
    },
    [recording]
  )

  const [errorOnLoadCoords] = getLocation(isFocused, callbackInitialCoords)
  const [errorRecordingCoords] = useLocation(recording, callbackRecodingCoords)

  const map = initialCoords ? (
    <Map />
  ) : (
    <ActivityIndicator size='large' style={{ marginTop: 200 }} />
  )
  useEffect(() => {}, [isFocused])

  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <Text h3>Create a Track</Text>
      {map}
      {errorOnLoadCoords || errorRecordingCoords ? (
        <Text>Please enable location services</Text>
      ) : null}

      <TrackForm />
    </SafeAreaView>
  )
}

TrackCreateScreen.navigationOptions = {
  title: 'Add Track',
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default withNavigationFocus(TrackCreateScreen)
