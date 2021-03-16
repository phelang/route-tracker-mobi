import React, { useContext } from 'react'
import { SafeAreaView } from 'react-navigation'
import { StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native'
import { ListItem } from 'react-native-elements'
import { NavigationEvents } from 'react-navigation'
import { Context as TrackContext } from '../context/TrackContext'

const TrackListScreen = ({ navigation }) => {
  const { state, fetchTracks } = useContext(TrackContext)

  return (
    <SafeAreaView style={styles.container} forceInset={{ top: 15 }}>
      <NavigationEvents
        onWillFocus={() => {
          fetchTracks()
        }}
      />
      {/* <Text style={{ fontSize: 48 }}>TrackListScreen</Text> */}
      <FlatList
        data={state}
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
                  <ListItem.Title>{item.name}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            </TouchableOpacity>
          )
        }}
      />
    </SafeAreaView>
  )
}

TrackListScreen.navigationOptions = {
  title: 'Tracks',
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default TrackListScreen
