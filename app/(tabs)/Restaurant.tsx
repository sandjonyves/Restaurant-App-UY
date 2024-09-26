import { View, Text, TouchableOpacity } from 'react-native'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Link ,router} from 'expo-router'
import { menu } from '@/db/menu'

import CustomNavbar from '@/components/NavBar'
import Restaurant1 from '@/components/restaurant/Restaurant1'
import CustomButton from '@/components/CustomButton'
import Card from '@/components/restaurant/Card'
import QrCode from '@/components/QrCode'
import { NativeBaseProvider, ScrollView } from 'native-base'

import { useDispatch, useSelector } from 'react-redux'

import { Dish } from '@/services/request/DIsh'
import { Alert } from 'react-native'
import times from '@/utils/Time'

type Props_Restaurant={
  changePage?:boolean,
  setChangePage? : Dispatch<SetStateAction<Boolean>>
}


const Restaurant = () => {

  const dishInstance = new Dish()

  const dispatch = useDispatch()

  const dish_selector = useSelector(state => state.dish.data)

  const test  = new Date()

  const [changePage,setChangePage] = useState<boolean>(true)
  const [isOpenQrCode,setIsOpenQrCode] = useState<boolean>(false)
  const [IsOpenModal,setIsOpenModal] = useState<boolean>(false)
  const handleShow = () => {setIsOpenModal(false)}

  const [MenuToDay,setMenuToDay] = useState<any>({})

  const shoiseDish =() =>{
      Alert.alert('dsjdggdhs')
    dishInstance.choise_dish({dish_id:1,dispatch})

  }

  useEffect(()=>{
    // Alert.alert(test)
    times(dispatch)
    console.log(test.getHours())
    dishInstance.choise_dish({dish_id:1,dispatch})
    dishInstance.get_dish({dish_id:1,dispatch:dispatch})
    setMenuToDay(dish_selector)

  },[])

  return (
    <NativeBaseProvider>
    <ScrollView>
    <View className=''>
      <CustomNavbar setChangePage={setChangePage} ></CustomNavbar>
      {/* <Text>Restaurant</Text>
      <Link className='mt-12 bg-red-400' href={'/Sign-in'}>ihdjdhjhsajhdjashdjash </Link>
      <TouchableOpacity
      onPress={()=> console.log(changePage)}
      >
        <Text>
          got to Order
        </Text>
      </TouchableOpacity> */}

      {
        changePage?<Card plateImage={menu.plateImage} name={menu.name} fruit={menu.fruit} meat={menu.meat} />:null
      }
                      {/* <View className='mt-8'>
                     <CustomButton padding={2} onPress={()=> setIsOpenModal(true)} variant='secondary' label='Valider votre commande'></CustomButton>
                     </View>  */}
      
    
      <QrCode isOpen={isOpenQrCode} setIsOpen={setIsOpenQrCode}/>

       <View className='mb-6'>
      <CustomButton
    //  disable={true}
            padding={4}
            label='Valider'
            width={'sm'}
            variant='secondary'
            onPress={() => ()=> shoiseDish()}
      
          />
      </View>
    
    </View>
    </ScrollView>
    </NativeBaseProvider>
  )
}

export default Restaurant