import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { plateNumber } from '@/db/menu';
import { icons } from '@/constants';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Select, Box, Radio, Stack, Icon } from 'native-base';
import Modal from '../Modal';
import CustomButton from '../CustomButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useDispatch, useSelector } from 'react-redux';
import { Command } from '@/services/request/Command';

import { decodeJWT } from "@/utils/decodeJWT";

type Props = {
  isOpen: boolean;
  handleShow: (isShowModal: boolean) => void;
};

type formData = {
  dish_number: number,
  operator: string,
  etudiant_id:number,
  restaurant_id:number
}

const OrderForm = ({ isOpen, handleShow }: Props) => {

  const command = new Command()

  const dispatch = useDispatch()

  const selector = useSelector(state => state.auth.user)  

  const [FormData,setFormData] = useState<formData>({
    dish_number:0,
    operator:'',
    etudiant_id:1,
    restaurant_id:1
  })
  const [ShowModal, setShowModal] = useState<boolean>(isOpen);
  const [selectedValue, setSelectedValue] = useState<string>('1');
  const [value, setValue] = useState('MTN');

  useEffect(() => {
    decodeJWT(selector.access)
    setShowModal(isOpen);
  }, [isOpen]);

  const handleSubmit = () => {
    // const formData = new FormData();
    // formData.append('dish_number', selectedValue);
    // formData.append('operator', value);

    console.log(FormData);
    command.register({data:FormData,dispatch:dispatch})


    
  };

  const handleChange = (item :string,value : string | number) =>{
    setFormData(
      {
        ...FormData,
        [item]:value
      }

    )
  }

  return (
    <View className='flex-1 items-center justify-center'>
      <Modal isOpen={ShowModal}>
        <View style={{ width: wp(80) }} className='bg-white rounded-xl'>
          <View className='items-end justify-center m-3'>
            <TouchableOpacity onPress={() => handleShow(false)}>
              <Image className='w-4 h-4' tintColor='red' source={icons.close} />
            </TouchableOpacity>
          </View>

          <View className='flex flex-col justify-center'>
            <View className='flex-col gap-y-0'>
              <View className='bg-gray-200 rounded-xl m-5'>
                <Text className='text-sm font-bold text-center'>
                  Nombre de plat:
                </Text>
                <Box>
                  <Select className='text-center text-xl' onValueChange={itemsValue => handleChange('dish_number',parseInt(itemsValue))}>
                    {plateNumber.map((item) => (
                      <Select.Item key={item} label={`${item}`} value={`${item}`} />
                    ))}
                  </Select>
                </Box>
              </View>
            </View>

            <View>
              <Radio.Group name='PaymementMode' onChange={item => handleChange('operator',item)}>
                <Stack
                  direction={{ base: 'column', md: 'row' }}
                  alignItems={{ base: 'flex-start', md: 'center' }}
                  justifyContent={{ base: 'space-around' }}
                  m={2}
                  mx={6}
                  space={4}
                  w='75%'
                  maxW='300px'
                >
                  <View className='flex flex-row items-center space-x-16'>
                    <Image style={{ width: wp(25), height: hp(8) }} source={require('@/assets/images/mtn.png')} />
                    <View className='flex flex-row space-x-2'>
                      <Text>MTN</Text>
                      <Radio value='MTN' colorScheme='yellow' size='sm' my={1} icon={<Icon as={<MaterialCommunityIcons name='fire' />} />} />
                    </View>
                  </View>
                  <View className='flex flex-row items-center space-x-10'>
                    <Image style={{ width: wp(25), height: hp(8) }} source={require('@/assets/images/orange.png')} />
                    <View className='flex flex-row space-x-2'>
                      <Text>ORANGE</Text>
                      <Radio value='ORANGE' colorScheme='yellow' size='sm' my={1} icon={<Icon as={<MaterialCommunityIcons name='fire' />} />} />
                    </View>
                  </View>
                </Stack>
              </Radio.Group>
            </View>

            <View className='p-4'>
              <CustomButton onPress={handleSubmit} label='Valider' padding={2} width_label='2' width='l' />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default OrderForm;
