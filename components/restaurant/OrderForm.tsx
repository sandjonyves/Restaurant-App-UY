import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { plateNumber } from '@/db/menu'
import { icons } from '@/constants'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import { Picker } from '@react-native-picker/picker'
import { RadioButton } from 'react-native-paper';
import { Select, Box, Radio, Stack, Icon } from 'native-base';

import Modal from '../Modal'
import Signin from '@/app/(auth)/Sign-in'
import CustomButton from '../CustomButton'
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Props = {
  isOpen: boolean,
  handleShow: (isShowModal: boolean) => void

}

// const ContextShowModal = useContext(ShowContextModal)

const OrderForm = ({ isOpen, handleShow }: Props) => {
  // const handleShow = (isOpen:boolean) =>{
  //   setShowModal(isOpen)
  // }
  const [ShowModal, setShowModal] = useState<boolean>(isOpen)

  const [selectedValue, setSelectedValue] = useState(1);
  const [value, setValue] = useState('MTN');

  const FormDatas = new FormData()

  const handleSubmit = ()=>{
    console.log(FormDatas)
  }

  // useEffect(()=>{
  //   onSubmit()
  // })
  return (
    <View className='flex-1 items-center justify-center'>
      <Modal
        isOpen={isOpen}
      >
        <View
          style={{ width: wp(80) }}
          className={`bg-white rounded-xl `}>
          <View className='items-end justify-center m-3'>
            <TouchableOpacity
              onPress={() => handleShow(false)}
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
                <Box>
                  <Select className='text-center text-xl' onValueChange={itemsValue => FormDatas.append('platNumber',itemsValue)}>
                    {plateNumber.map((item) => <Select.Item label={`${item}`} value={`${item}`} ></Select.Item>)}
                  </Select>
                </Box>

              </View>

            </View>
          <View className=''>
          <Radio.Group name='PaymementMode'>
              <Stack direction={{
          base: "column",
          md: "row"
        }} 
        alignItems={{
          base: "flex-start",
          md: "center"
        }} 
        justifyContent={{
          base:"space-arround"
        }}
        m={2}
        mx={6}
        space={4} w="75%" maxW="300px">
              <View className=' flex flex-row items-center space-x-16'>
                <Image
                  style={{ width: wp(25), height: hp(8) }}
                  source={require('@/assets/images/mtn.png')}
                />
                <View className='flex flex-row space-x-2'>
                <Text>MTN</Text>
                <Radio value='MTN' colorScheme="yellow" size="sm" my={1} icon={<Icon as={<MaterialCommunityIcons name="fire" />}/>} />
                </View>
              
              </View>
              <View className=' flex flex-row items-center space-x-10'>
                <Image
                  style={{ width: wp(25), height: hp(8) }}
                  source={require('@/assets/images/orange.png')}
                />
                <View className='flex flex-row space-x-2'>
                <Text>ORANGE</Text>
                <Radio value='ORANGE' colorScheme="yellow" size="sm" my={1}  icon={<Icon as={<MaterialCommunityIcons name="fire" />}/>} />
                </View>
              
              </View>
              {/* <View className='flex flex-row items-center space-x-8'>
                <Image
                  style={{ width: wp(25), height: hp(8) }}
                  source={require('@/assets/images/orange.png')}
                />
              
                <Radio className='' value='Orange' ></Radio>
                
              </View> */}
              </Stack>
            </Radio.Group>
          </View>
              
      {/* <RadioButton.Group onValueChange={itemsValue => FormDatas.append('PayementMode',itemsValue)} value={value}>
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
            onPress={handleSubmit}
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

export default OrderForm