import { View } from 'native-base'
import React from 'react'
import Modal from './Modal'
import QrCode from './QrCode'

function Scan() {
  return (
    <View>
        <Modal isOpen={true}>
            <QrCode ></QrCode>
        </Modal>
    </View>
  )
}

export default Scan