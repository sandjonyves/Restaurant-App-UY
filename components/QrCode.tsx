import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import QRCode from 'react-native-qrcode-svg';
import Modal from './Modal';
import { icons } from '@/constants';
import CustomButton from './CustomButton';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import {createToken,decodeToken} from '@/db/Commendes'

import { useSelector, UseSelector } from 'react-redux';
type Props = {
  isOpen?: boolean,

  setIsOpen : React.Dispatch<React.SetStateAction<boolean>>
};

const QrCode = ({ isOpen, setIsOpen }: Props) => {

  const selector = useSelector(state => state.command.commandData)

  const [ShowModal, setShowModal] = useState<boolean>(isOpen?isOpen:false);

  const handleSubmit =() => {
    console.log('reststts',typeof(createToken(selector)))

  }

 useEffect(()=>{
  console.log('reststts',createToken(selector))
 },[])

  return (
    <View className='flex-1 items-center justify-center'>
      <Modal
        isOpen={isOpen?isOpen:false}
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
            size={wp(60)}  
            value={typeof createToken(selector) === 'string' ? createToken(selector) : ''} 
            quietZone={10}  
/>
          </View>
        </View>
        <View className=' p-4 '>
          <CustomButton
            onPress={handleSubmit}
            label='Valider'
            padding={2}
            width_label={'2'}
            width={'l'}
          />
        </View>
      </Modal>
    </View>
  );
};

export default QrCode;
