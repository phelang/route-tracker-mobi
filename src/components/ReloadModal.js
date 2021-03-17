import React, { useState } from 'react'
import { Input } from 'react-native-elements'
import { SafeAreaView } from 'react-navigation'
import Spacer from './Spacer'
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native'

export default function ReloadModal({ showModal, reload }) {
  const [modalVisible, setModalVisible] = useState(showModal)

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
              <Text style={styles.modalText}>
                Location provider is unavailable. Please reload to enable
                location services ...
              </Text>

              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: '#00ff40' }}
                onPress={() => {
                  console.log('reloading modal about to be called')
                  reload(true)
                  setModalVisible(!modalVisible)
                }}
              >
                <Text style={styles.textStyle}>Reload</Text>
              </TouchableHighlight>

              <Spacer />
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                onPress={() => {
                  console.log('cancel any reload process')
                  reload(false)
                  setModalVisible(!modalVisible)
                }}
              >
                <Text style={styles.textStyle}>Close</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    // justifyContent: 'center',
    // alignItems: 'center',
    marginTop: 22,
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
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
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
