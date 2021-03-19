import React, { useContext } from 'react'
import { SafeAreaView } from 'react-navigation'
import {
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import { ListItem } from 'react-native-elements'
import { NavigationEvents } from 'react-navigation'
import { Context as TrackContext } from '../context/TrackContext'

const TrackListScreen = ({ navigation }) => {
  const {
    state: { loading, tracks, error },
    fetchTracks,
  } = useContext(TrackContext)

  let isError =
    tracks.length === 0 && !loading ? (
      <Text style={styles.textStyle}>
        You have no tracks, start creating ...
      </Text>
    ) : null

  let systemError = <Text style={styles.textStyle}>{error}</Text>

  return (
    <SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
      <Text style={styles.titleStyle}>Tracks</Text>
      <NavigationEvents
        onWillFocus={() => {
          fetchTracks()
        }}
      />

      {!error ? isError : systemError}
      {!loading ? (
        <FlatList
          data={tracks}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('TrackDetail', {
                    _id: item._id,
                    tracks: tracks,
                  })
                }
              >
                <ListItem key={item._id} bottomDivider>
                  <ListItem.Content>
                    <ListItem.Title style={styles.itemStyle}>
                      {item.name}
                    </ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Chevron />
                </ListItem>
              </TouchableOpacity>
            )
          }}
        />
      ) : (
        <ActivityIndicator size='large' style={{ marginTop: 200 }} />
      )}
    </SafeAreaView>
  )
}

TrackListScreen.navigationOptions = () => {
  return {
    header: null,
  }
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
    fontSize: 30,
  },
  itemStyle: {
    color: 'gray',
    fontFamily: 'sans-serif-light',
    fontSize: 20,
  },
  textStyle: {
    textAlign: 'center',
    margin: 30,
    fontSize: 15,
    color: 'gray',
  },
})

export default TrackListScreen
