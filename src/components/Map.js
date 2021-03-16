import React, { useContext, useEffect } from 'react'
import { Text, StyleSheet, View, ActivityIndicator } from 'react-native'
import MapView, { Polyline, Circle, PROVIDER_GOOGLE } from 'react-native-maps'
import { Context as LocationContext } from '../context/LocationContext'

const Map = () => {
    const { state } = useContext(LocationContext)
    const { currentLocation, locations } = state

    if (!currentLocation) {
        return <ActivityIndicator size='large' style={{ marginTop: 200 }} />
    }

    return (
        <>
            <MapView
                style={styles.map}
                initialRegion={{
                    ...currentLocation.coords,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
            >
                <Circle
                    center={currentLocation.coords}
                    radius={25}
                    strokeColor='rgba(158, 159, 255, 1.0)'
                    fillColor='rgba(158, 159, 255,0.3)'
                />
                <Polyline coordinates={locations.map((loc) => loc.coords)} />
            </MapView>
        </>
    )
}

const styles = StyleSheet.create({
    map: {
        height: 300,
    },
})

export default Map
