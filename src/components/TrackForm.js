import React, { useState, useContext } from 'react'
import { Input } from 'react-native-elements'
import { SafeAreaView } from 'react-navigation'
import Spacer from './Spacer'
import { Context as LocationContext } from '../context/LocationContext'
import useSaveTrack from '../hooks/useSaveTrack'
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native'

export default function App() {
  const {
    state: { name, recording, locations },
    startRecording,
    stopRecording,
    changeName,
    cancelRecordingReset,
  } = useContext(LocationContext)

  const [saveTrack] = useSaveTrack()

  const [modalVisible, setModalVisible] = useState(false)
  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <View style={styles.centeredView}>
        <Modal
          animationType='slide'
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.')
          }}
        >
          <View style={styles.contentView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Save Recording</Text>

              <Input
                value={name}
                onChangeText={changeName}
                placeholder='Enter track name'
              />

              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: '#00ff40' }}
                onPress={() => {
                  setModalVisible(!modalVisible)
                  saveTrack()
                }}
              >
                <Text style={styles.textStyle}>Save</Text>
              </TouchableHighlight>

              <Spacer />
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                onPress={() => {
                  cancelRecordingReset()
                  setModalVisible(false)
                }}
              >
                <Text style={styles.textStyle}>Close</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <View style={styles.centeredView}>
          {recording ? (
            <TouchableHighlight
              style={styles.closeButton}
              onPress={() => {
                stopRecording()
                setModalVisible(true)
              }}
            >
              <Text style={styles.textStyle}>Stop</Text>
            </TouchableHighlight>
          ) : (
            <TouchableHighlight
              style={styles.openButton}
              onPress={() => {
                startRecording()
              }}
            >
              <Text style={styles.textStyle}>Start Recording</Text>
            </TouchableHighlight>
          )}
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    marginTop: 0,
    margin: 'auto',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  contentView: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
  },
  modalView: {
    height: '70%',
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
  },
  openButton: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 10,
    elevation: 5,
  },

  closeButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
})
