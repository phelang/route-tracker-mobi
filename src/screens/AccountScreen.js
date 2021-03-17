import React, { useContext } from 'react'
import { SafeAreaView } from 'react-navigation'
import { View, StyleSheet } from 'react-native'
import { Text, Button } from 'react-native-elements'
import { Context as AuthContext } from '../context/AuthContext'
import { EvilIcons } from '@expo/vector-icons'

const AccountScreen = () => {
  const { signOut } = useContext(AuthContext)

  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <View style={styles.alignCenter}>
        <Text h3 style={styles.textStyle}>
          Account Screen
        </Text>
        <Button
          buttonStyle={styles.buttonStyle}
          onPress={signOut}
          title={'Sign Out'}
        />
        <Button
          buttonStyle={styles.buttonStyle2}
          onPress={signOut}
          title={'Delete Account'}
        />
      </View>
    </SafeAreaView>
  )
}

AccountScreen.navigationOptions = {
  tabBarIcon: <EvilIcons name='gear' size={24} color='black' />,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 200,
    margin: 20,
    position: 'relative',
  },
  alignCenter: {
    flex: 1,
    marginTop: '30%',
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  textStyle: {
    color: 'gray',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginBottom: 20,
  },
  buttonStyle: {
    height: 50,
    width: 150,
    borderRadius: 20,
    padding: 15,
    backgroundColor: '#2196F3',
    margin: 10,
  },
  buttonStyle2: {
    height: 50,
    width: 150,
    borderRadius: 20,
    padding: 15,
    backgroundColor: '#FF5733',
    margin: 10,
  },
})

export default AccountScreen
