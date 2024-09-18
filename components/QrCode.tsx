import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import QRCode from 'react-native-qrcode-svg';
import Modal from './Modal';
import { icons } from '@/constants';
import CustomButton from './CustomButton';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import {token,decodedData} from '@/db/Commendes'
type Props = {
  isOpen: boolean,

  setIsOpen : React.Dispatch<React.SetStateAction<boolean>>
};

const QrCode = ({ isOpen, setIsOpen }: Props) => {
  const [ShowModal, setShowModal] = useState<boolean>(isOpen);

  const handleSubmit = () => {
    console.log(token,decodedData)
  };

  return (
    <View className='flex-1 items-center justify-center'>
      <Modal
        isOpen={isOpen}
      >
        <View
          style={{ width: wp(80) }}
          className={`bg-white rounded-xl `}
        >
          <View className='items-end justify-center m-3'>
            <TouchableOpacity
              onPress={() => setIsOpen(false)}
            >
              <Image
                className='w-4 h-4'
                tintColor={'red'}
                source={icons.close}
              />
            </TouchableOpacity>
          </View>
          <View className='flex w-full items-center justify-center mb-5'>
            <QRCode
              size={wp(60)}  // Ajuste cette valeur pour la taille souhaitée
              value="https://example.com"  // Remplace par la valeur du QR code
              quietZone={10}  // Optionnel : ajuste la marge autour du QR code
            />
          </View>
        </View>
        {/* <View className=' p-4 '>
          <CustomButton
            onPress={handleSubmit}
            label='Valider'
            padding={2}
            width_label={'2'}
            width={'l'}
          />
        </View> */}
      </Modal>
    </View>
  );
};

export default QrCode;
