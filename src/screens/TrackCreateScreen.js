import '../_mockLocation'
import React, { useContext, useCallback } from 'react'
import {
    SafeAreaView,
    withNavigationFocus,
    NavigationEvents,
} from 'react-navigation'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'
import Map from '../components/Map'
import { Context as LocationContext } from '../context/LocationContext'
import useLocation from '../hooks/useLocation'
import TrackForm from '../components/TrackForm'

const TrackCreateScreen = ({ isFocused }) => {
    const {
        state: { recording },
        addLocation,
    } = useContext(LocationContext)

    const callback = useCallback(
        (location) => {
            addLocation(location, recording)
        },
        [recording]
    )

    const [error] = useLocation(recording || isFocused, callback)

    return (
        <SafeAreaView forceInset={{ top: 'always' }}>
            <Text h3>Create a Track</Text>
            <Map />
            {error ? <Text>Please enable location services</Text> : null}
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
