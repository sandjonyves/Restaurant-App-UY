import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Modal from './Modal'
import Signin from '@/app/(auth)/Sign-in'
// import { Picker } from '@react-native-picker/picker'
import { icons } from '@/constants'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import { RadioButton } from 'react-native-paper';
import { ShowContextModal } from './restaurant/Restaurant1'
import CustomButton from './CustomButton'
import { Button } from 'native-base'

type PROPS_COMMANDE ={
    isOpen:boolean,
    handleShow:(isShowModal:boolean)=> void
}

// const ContextShowModal = useContext(ShowContextModal)

const Commande = ({isOpen,handleShow}:PROPS_COMMANDE) => {
  // const handleShow = (isOpen:boolean) =>{
  //   setShowModal(isOpen)
  // }
  const [ShowModal,setShowModal] = useState<boolean>(isOpen)

  const [selectedValue, setSelectedValue] = useState(1);
  const [value, setValue] = useState('first');

  return (
    <View className='flex-1 items-center justify-center'>
     <Modal
     isOpen={isOpen}
     >
      <View
     style={{width:wp(80)}}
      className={`bg-white rounded-xl `}>
      <View className='items-end justify-center m-3'>
    <TouchableOpacity
    onPress={()=> handleShow(false)}
    >
            <Image 
            className='w-4 h-4'
            tintColor={'red'}
            source={icons.close}></Image>
    </TouchableOpacity>
    </View>


    <View className='flex flex-col justify-center'>
   <View className='flex-col gap-y-0'>
    
   <View className='bg-gray-200 rounded-xl m-5'>
   <Text className='text-sm font-bold text-center'>
      Nombre de plat: 
    </Text>
    <Button ><Text>test</Text></Button>
   {/* <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue) => setSelectedValue(itemValue)}
      >

        <Picker.Item label="1" value="1" />
        <Picker.Item label="2" value="2" />
      </Picker> */}
   </View>

   </View>
{/*   
      <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
       <View className='flex flex-row justify-around'>
        <Image
        style={{width:wp(25),height:hp(8)}}
        source={require('@/assets/images/mtn.png')}
        />
       <RadioButton.Item label="MTN" value="MTN" />
       </View>
       <View className='flex flex-row justify-around ml-1'>
        <Image
        style={{width:wp(25),height:hp(8)}}
        source={require('@/assets/images/orange.png')}
        />
       <RadioButton.Item label="Orange" value="Orange" />
       </View>

      </RadioButton.Group> */}
    </View>
         <View className=' p-4 '>
         <CustomButton
           label='Valider'
           padding={2}
            width_label={'2'}
            width={'l'}       
           />
         </View>
      </View>
     </Modal>
    </View>
  )
}

export default Commande