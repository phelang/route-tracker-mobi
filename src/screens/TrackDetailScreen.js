import React, { useContext } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { Context as TrackContext } from '../context/TrackContext'
import MapView, { Polyline } from 'react-native-maps'

const TrackDetailScreen = ({ navigation }) => {
    const { state } = useContext(TrackContext)
    const _id = navigation.getParam('_id')

    const track = state.find((t) => t._id === _id)
    const initialCoords = track.locations[0].coords

    return (
        <SafeAreaView style={styles.container} forceInset={{ top: 15 }}>
            <Text style={{ fontSize: 48 }}>{track.name}</Text>
            <MapView
                initialRegion={{
                    longitudeDelta: 0.001,
                    latitudeDelta: 0.01,
                    ...initialCoords,
                }}
                style={styles.map}
            >
                <Polyline
                    coordinates={track.locations.map((loc) => loc.coords)}
                />
            </MapView>
        </SafeAreaView>
    )
}

TrackDetailScreen.navigationOptions = () => {
    return {
        header: null,
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        height: 300,
    },
})

export default TrackDetailScreen
