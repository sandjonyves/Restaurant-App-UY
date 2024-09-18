import { View, Text, Image, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { NativeBaseProvider } from 'native-base';
import CustomButton from '../CustomButton';
import OrderForm from './OrderForm';
import QrCode from '../QrCode';

type Props = {
  plateImage: any;
  name: string;
  fruit: string;
  meat: string;
};

const Card = ({ plateImage, name, fruit, meat }: Props) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenQrCode,setIsOpenQrCode] = useState<boolean>(false)
  const handleShow = () => {
    setIsOpenModal(false);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 8 }}>
      <View className="flex flex-col bg-gray-100 border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 mb-4">
        <Text className="text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          12h30-16h
        </Text>

        <Image
          source={plateImage}
          className="rounded-xl w-full h-48"
          resizeMode="cover"
        />

        <View className="flex justify-center p-4">
          <Text className="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {name}
          </Text>
          <View className="ml-5 mb-4">
            <Text>Fruit: {fruit}</Text>
            <Text>Obstacle: {meat}</Text>
          </View>

          <CustomButton
            padding={1}
            label='Commander'
            width={'sm'}
            onPress={() => setIsOpenModal(true)}
          />
        </View>
        <View className='mb-7'>
   
     </View>
      </View>
     
      <QrCode isOpen={isOpenQrCode} setIsOpen={setIsOpenQrCode}/>
    
            {/* <CustomButton
            padding={1}
            label='Commander'
            width={'sm'}
            onPress={() => setIsOpenModal(true)}
          /> */}
      <NativeBaseProvider>
        
        <OrderForm isOpen={isOpenModal} handleShow={handleShow} />
      </NativeBaseProvider>
      <View className='mb-12'>
      <CustomButton
    //  disable={true}
            padding={2}
            label='Valider'
            width={'sm'}
            variant='secondary'
            onPress={() => setIsOpenModal(true)}
      
          />
      </View>
    </ScrollView>
  );
};

export default Card;