import React, { useContext, useEffect, useState } from 'react'
import { Text, StyleSheet, View, ActivityIndicator } from 'react-native'
import MapView, { Polyline, Circle, Marker } from 'react-native-maps'
import { Context as LocationContext } from '../context/LocationContext'
import pin from '../../assets/pin.png'

const Map = ({ initialCoords, currentLocation, locations, recording }) => {
  return (
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

      <Polyline
        coordinates={locations.map((loc) => loc.coords)}
        strokeWidth={4}
        strokeColor='rgb(255,223,0)' //''
        geodesic={true}
      />
    </MapView>
  )
}

const styles = StyleSheet.create({
  map: {
    marginTop: 0,
    paddingTop: 0,
    height: '80%',
    shadowOpacity: 0.3,
  },
})

export default Map
