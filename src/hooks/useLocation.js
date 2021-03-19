import { useState, useEffect } from 'react'
import {
  Accuracy,
  requestPermissionsAsync,
  watchPositionAsync,
  getCurrentPositionAsync,
} from 'expo-location'
import { call } from 'react-native-reanimated'

export const useGetLocation = (shouldGetInitial, reloadLocation, callback) => {
  const [errorOnLoadCoords, setErrorOnLoadCoords] = useState(false)

  useEffect(() => {
    let location
    const findLocation = async () => {
      try {
        const { granted } = await requestPermissionsAsync()
        if (!granted) {
          setErrorOnLoadCoords(true)
          throw new Error('Permission to access location was denied')
        }

        location = await getCurrentPositionAsync({})
        if (!location) {
          console.log('no location ', location, ' ?value')
          setErrorOnLoadCoords(true)
        }
        callback(location)
      } catch (e) {
        console.log('system error location ', location)
        setErrorOnLoadCoords(true)
      }
    }

    findLocation()

    return () => {
      if (location) {
        location = null
      }
    }
  }, [shouldGetInitial, reloadLocation])
  return [errorOnLoadCoords]
}

export const useLocation = (shouldTrack, callback) => {
  const [error, setError] = useState(null)
  const [startLocation, setStartLocation] = useState(null)

  useEffect(() => {
    let subscriber
    const startWatching = async () => {
      try {
        const { granted } = await requestPermissionsAsync()
        if (!granted) {
          throw new Error('Permission to access location was denied')
        }

        subscriber = await watchPositionAsync(
          {
            accuracy: Accuracy.BestForNavigation,
            timeInterval: 1000,
            distanceInterval: 10,
          },
          // return a callback location
          callback
        )
      } catch (e) {
        setError(e)
      }
    }

    if (shouldTrack) {
      startWatching()
    } else {
      if (subscriber) {
        subscriber.remove()
      }
      subscriber = null
    }
    return () => {
      if (subscriber) {
        subscriber.remove()
      }
    }
  }, [shouldTrack, callback])

  return [error]
}
