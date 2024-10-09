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
import { updateRestaurant } from '@/redux/slices/AutorisationSlice';

type Props = {
  isOpen: boolean;
  handleShow: (isShowModal: boolean) => void;
  dish_selector: any;
  commandDish: (id: number) => void;
};

type FormData = {
  dish_number: number;
  operator: string;
  etudiant_id: number;
  dish_id: number;
  restaurant_id: number;
};

const OrderForm: React.FC<Props> = ({ isOpen, handleShow, dish_selector, commandDish }) => {
  const command = new Command();
  const dispatch = useDispatch();
  const selector = useSelector(state => state.auth.user);

  const [formData, setFormData] = useState<FormData>({
    dish_number: 0,
    operator: '',
    dish_id: dish_selector.id,
    etudiant_id: 1,
    restaurant_id: dish_selector.restaurant_id,
  });

  const [showModal, setShowModal] = useState<boolean>(isOpen);
  const [selectedValue, setSelectedValue] = useState<string>('1');
  const [value, setValue] = useState('MTN');

  useEffect(() => {
    decodeJWT(selector.access);
    setShowModal(isOpen);
  }, [isOpen, selector.access]);

  const handleSubmit = () => {
    console.log(formData);
    command.register({ data: formData, dispatch });
    commandDish(dish_selector.restaurant_id);
   
  };

  const handleChange = (item: keyof FormData, value: string | number) => {
    setFormData({
      ...formData,
      [item]: value,
    });
  };

  return (
    <View className='flex-1 items-center justify-center'>
      <Modal isOpen={showModal}>
        <View style={{ width: wp(80) }} className='bg-white rounded-xl'>
          <View className='items-end justify-center m-3'>
            <TouchableOpacity onPress={() => handleShow(false)}>
              <Image className='w-4 h-4' tintColor='red' source={icons.close} />
            </TouchableOpacity>
          </View>

          <View className='flex flex-col justify-center'>
            <View className='flex-col gap-y-0'>
              <View className='bg-gray-200 rounded-xl m-5'>
                <Text className='text-sm font-bold text-center'>Nombre de plat:</Text>
                <Box>
                  <Select className='text-center text-xl' onValueChange={itemsValue => handleChange('dish_number', parseInt(itemsValue))}>
                    {Array.from({ length: dish_selector.dish_max_number }, (_, index) => (
                      <Select.Item key={index} label={`${index + 1}`} value={`${index + 1}`} />
                    ))}
                  </Select>
                </Box>
              </View>
            </View>

            <View>
              <Radio.Group name='PaymentMode' onChange={item => handleChange('operator', item)}>
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
                      <Radio value='MTN' colorScheme='yellow' size='sm' my={1} icon={<Icon as={MaterialCommunityIcons} name='fire' />} />
                    </View>
                  </View>
                  <View className='flex flex-row items-center space-x-10'>
                    <Image style={{ width: wp(25), height: hp(8) }} source={require('@/assets/images/orange.png')} />
                    <View className='flex flex-row space-x-2'>
                      <Text>ORANGE</Text>
                      <Radio value='ORANGE' colorScheme='yellow' size='sm' my={1} icon={<Icon as={MaterialCommunityIcons} name='fire' />} />
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