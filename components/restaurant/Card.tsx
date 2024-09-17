import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { createContext, useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CustomButton from '../CustomButton';
import Commande from '../OrderForm';
import CommandeForm from '@/app/Form/CommandeForm';
import { NativeBaseProvider } from 'native-base';
import OrderForm from './OrderForm';

type Props ={
//   showModal:boolean;
  plateImage:any;
  name:string;
  fruit:string;
  meat:string;
}

const Card = ({plateImage,name,fruit,meat}:Props) => {
    const [IsOpenModal,setIsOpenModal] = useState<boolean>(false)
    const handleShow = () => {setIsOpenModal(false)}
    return (
    <View className="flex flex-col bg-gray-100 mx-4 border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      <Text className="text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        12h30-16h
      </Text>

      <View>
        <Image
          source={plateImage}
          className="relative rounded-xl w-full h-48"
          resizeMode="cover"
        />

        <View className="flex justify-center p-4">
          <Text className="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
           
           {name}

          </Text>
          <View className="ml-5 mb-4">
            <Text>Fruit: 
                {fruit}
            </Text>
            <Text>Obstacle: 
                {meat}
            </Text>
          </View>
          {/* <TouchableOpacity
            className="bg-light-tabBarActiveTintColor rounded-lg h-10 flex items-center justify-center"
            activeOpacity={0.7}
          >
            <Text className="text-center text-white font-bold">Commander</Text>
          </TouchableOpacity> */}
          <CustomButton padding={1} label='Commander' width={'sm'} 
          onPress={()=> setIsOpenModal(true)}
          ></CustomButton>
        </View>
      </View>
     <NativeBaseProvider>
      <OrderForm isOpen={IsOpenModal} handleShow={handleShow}></OrderForm>
     </NativeBaseProvider>
    </View>
  );
};

export default Card;