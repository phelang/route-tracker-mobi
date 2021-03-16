import React, {useEffect, useContext} from 'react'
import { View } from 'react-native'
import { Text, Button, Input } from 'react-native-elements'
import { Context } from '../context/AuthContext'

const ResolveAuthScreen = () => {
  const { tryLocalSignIn } = useContext(Context)

  useEffect(() => {
    tryLocalSignIn()
  }, [])

  return null
}

export default ResolveAuthScreen
