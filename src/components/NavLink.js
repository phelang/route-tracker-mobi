import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-elements'
import Spacer from './Spacer'
import { withNavigation } from 'react-navigation'

const NavLink = ({ navigation, routeName, routeText, clear}) =>{
  return (
    <>
     <Spacer>
        <TouchableOpacity onPress={() => navigation.navigate(routeName)}>
        <Text style={styles.linkStyle}>
            {routeText}
          </Text>
        </TouchableOpacity>
      </Spacer>
    </>
  )
}

const styles = StyleSheet.create({
    linkStyle: {
        color: '#037ffc',
    },
})

export default withNavigation(NavLink)