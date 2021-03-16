import React, { useContext, useEffect, useState } from 'react'
import { Text, StyleSheet, View, ActivityIndicator } from 'react-native'
import MapView, { Polyline, Circle, Marker } from 'react-native-maps'
import { Context as LocationContext } from '../context/LocationContext'
import pin from '../../assets/pin.png'

const Map = () => {
  const { state } = useContext(LocationContext)
  const { initialCoords, currentLocation, locations } = state

  console.log('loading should be null ', locations.length)
  console.log('current location ', currentLocation)
  console.log('initial location ', initialCoords)

  return (
    <>
      <MapView
        style={styles.map}
        initialRegion={{
          ...initialCoords.coords,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {currentLocation ? (
          <Circle
            center={currentLocation.coords}
            radius={25}
            strokeColor='rgba(158, 159, 255, 1.0)'
            fillColor='rgba(158, 159, 255,0.3)'
          />
        ) : null}

        <Marker
          coordinate={{
            longitude: initialCoords.coords['longitude'],
            latitude: initialCoords.coords['latitude'],
          }}
          image={pin}
        />

        <Polyline coordinates={locations.map((loc) => loc.coords)} />
      </MapView>
    </>
  )
}

const styles = StyleSheet.create({
  map: {
    height: 300,
    shadowOpacity: 0.5,
  },
})

export default Map
