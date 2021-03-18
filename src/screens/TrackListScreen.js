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
    state: { loading, tracks },
    fetchTracks,
  } = useContext(TrackContext)

  console.log('Is loading ', tracks.length)
  return (
    <SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
      <Text style={styles.titleStyle}>Tracks</Text>
      <NavigationEvents
        onWillFocus={() => {
          fetchTracks()
        }}
      />
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
})

export default TrackListScreen
