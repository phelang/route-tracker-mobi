import { useContext } from 'react'
import { Context as TrackContext } from '../context/TrackContext'
import { Context as LocationContext } from '../context/LocationContext'
import { navigate } from '../navigationRef'

export default () => {
  const { createTrack } = useContext(TrackContext)
  const {
    state: { name, locations },
    reset,
  } = useContext(LocationContext)

  const saveTrack = async () => {
    navigate('TrackList')
    await createTrack(name, locations)
    reset()
  }
  return [saveTrack]
}
