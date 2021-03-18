import React, { useState, useEffect } from 'react'
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

export default function ReloadModal({ showModal, reload, setExit }) {
  const [modalVisible, setModalVisible] = useState(showModal)

  useEffect(() => {
    // for ome reason the onload default initialization does not work as
    // explicit initialization at any time the compoent reloads
    if (showModal) {
      setModalVisible(true)
    } else {
      setModalVisible(false)
    }
  }, [showModal])

  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <View style={styles.centeredView}>
        <Modal
          animationType='slide'
          transparent={true}
          visible={modalVisible || showModal}
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
                  // reload useLocation hook
                  // this is try bu the only way that useLocation is recalled is because the reload is inverted to give the impression that reload state has change
                  // this will force useLocation hook to invoke itself
                  reload((prev) => !prev)
                  setModalVisible(true)
                }}
              >
                <Text style={styles.textStyle}>Reload</Text>
              </TouchableHighlight>

              <Spacer />
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                onPress={() => {
                  // exit application reset
                  reload(false)
                  setModalVisible(false)
                  setExit(true)
                }}
              >
                <Text style={styles.textStyle}>Exit</Text>
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
