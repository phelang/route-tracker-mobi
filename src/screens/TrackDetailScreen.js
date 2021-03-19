import React, { useContext } from 'react'
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { Context as TrackContext } from '../context/TrackContext'
import MapView, { Polyline, Marker } from 'react-native-maps'
import pin from '../../assets/pin.png'
import { AntDesign } from '@expo/vector-icons'

const TrackDetailScreen = ({ navigation }) => {
  const {
    state: { loading },
    deleteTrack,
  } = useContext(TrackContext)

  const _id = navigation.getParam('_id')
  const tracks = navigation.getParam('tracks')

  const track = tracks.find((t) => t._id === _id)
  const initialCoords =
    track.locations.length > 0 ? track.locations[0].coords : null
  const lastCoords =
    track.locations.length > 1
      ? track.locations[track.locations.length - 1].coords
      : null

  return (
    <SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
      <View style={styles.myTracks}>
        <Text style={styles.titleStyle}>{track.name}</Text>

        <TouchableOpacity
          style={styles.iconStyle}
          onPress={() => deleteTrack(_id)}
        >
          {loading ? (
            <ActivityIndicator size='large' />
          ) : (
            <AntDesign name='delete' size={24} color='black' />
          )}
        </TouchableOpacity>
      </View>

      {initialCoords ? (
        <MapView
          initialRegion={{
            longitudeDelta: 0.001,
            latitudeDelta: 0.01,
            ...initialCoords,
          }}
          style={styles.map}
        >
          <Marker
            coordinate={{
              ...initialCoords,
            }}
            image={pin}
          />
          {lastCoords ? (
            <Marker
              coordinate={{
                ...lastCoords,
              }}
              image={pin}
            />
          ) : null}
          <Polyline
            coordinates={track.locations.map((loc) => loc.coords)}
            strokeWidth={4}
            strokeColor='rgb(255,223,0)' //''
            geodesic={true}
          />
        </MapView>
      ) : (
        <Text style={styles.textStyle}>
          This recording is too short ... no coordinates to show
        </Text>
      )}
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
    height: '100%',
    width: '100%',
  },
  myTracks: {
    flexDirection: 'row',
    color: 'gray',
    elevation: 5,
    borderRadius: 10,
    padding: 15,
  },
  titleStyle: {
    fontSize: 30,
    paddingLeft: 15,
  },

  iconStyle: {
    alignSelf: 'center',
    position: 'absolute',
    right: 0,
    paddingRight: 15,
  },
  textStyle: {
    textAlign: 'center',
    margin: 30,
    fontSize: 15,
    color: 'gray',
  },
})

export default TrackDetailScreen
