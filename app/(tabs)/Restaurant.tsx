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

import { Dishes } from '@/services/request/DIsh'
import { Alert } from 'react-native'
import times from '@/utils/Time'
import { R1_disabled,R2_disabled } from '@/redux/slices/AutorisationSlice'

type Props_Restaurant={
  changeRestaurant?:boolean,
  setChangeRestaurant? : Dispatch<SetStateAction<Boolean>>
}


const Restaurant = () => {

  const dishInstance = new Dishes()

  const dispatch = useDispatch()
  // const dishChoise_selector = useSelector(state => state.dish.dish_choise)

  const dish_selector = useSelector(state => state.dish.data)

  const [restaurants, setRestaurants] = useState([
    { id: 1, name: 'Restaurant I', ordered: false, validated: false },
    { id: 2, name: 'Restaurant II', ordered: false, validated: false }
  ]);



  const enable_valid_and_command_button = useSelector(state => state.autorisation.is_disabled)
 
  const R1_order_autorize_selector = useSelector(state=>state.autorisation.R1_order_is_disabled)

  const R1_disabled_selector = useSelector(state => state.autorisation.r1_disabled)
  const R2_disabled_selector = useSelector(state => state.autorisation.r2_disabled)
  const R_selector  = useSelector(state => state.autorisation.is_disabled)
  const test  = new Date()

  const [changeRestaurant,setChangeRestaurant] = useState<number>(1)
  const [isOpenQrCode,setIsOpenQrCode] = useState<boolean>(false)
  const [IsOpenModal,setIsOpenModal] = useState<boolean>(false)
  const handleShow = () => {setIsOpenModal(false)}

  const [MenuToDay,setMenuToDay] = useState<any>({})




  const validOrder = (id:number) => {
    setRestaurants(prevRestaurants =>
      prevRestaurants.map(restaurant =>
        restaurant.id === id ? { ...restaurant, validated: true } : restaurant
      )
    );
  };


  const shoisedish =() =>{
      Alert.alert('dsjdggdhs')
    dishInstance.choise_dish({dish_id:1,dispatch})

  }



  const options = {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  };
  

const TimeOfTisMoment = new Date()

const localTime  = TimeOfTisMoment.toLocaleString('fr-FR', options);
console.log(localTime)   


  useEffect(()=>{
    // Alert.alert(test)
    times({dispatch:dispatch})

    if(R1_disabled_selector){
    
      restaurants[0].ordered=true
      restaurants[0].validated=true
    }
     if(R2_disabled_selector){

      restaurants[1].ordered=true
      restaurants[1].validated=true
    }
     if(!R_selector){
      console.log('test4343333333333333333333333333333333333333333333333333333333333333333333333333344444444444444')
      restaurants[1].ordered=false
      restaurants[1].validated=false
      restaurants[0].ordered=false
      restaurants[0].validated=false
    }
    console.log(R_selector,R1_disabled_selector,R2_disabled_selector)
    // console.log(enable_valid_and_command_button,R1_order_autorize_selector ,R1_valid_order_selector,R2_valid_order_selector)
    // if(enable_valid_and_command_button){
    //   console.log('dshdjhsjhdjhsdjhdjhsjhdjshjdhjhdjhsjdhsjdhjshjdhsjhdj66')
    //   dispatch(R1_disabled(false))
    //   dispatch(R1_valid_disabled(false))
    //   dispatch(R2_disabled(false))
    //   dispatch(R2_valid_disabled(false))
    // }else{
    //   dispatch(R1_disabled(true))
    //   dispatch(R1_valid_disabled(true))
    //   dispatch(R2_disabled(true))
    //   dispatch(R2_valid_disabled(true))
    // }
   

    // dishInstance.choise_dish({dish_id:1,dispatch})
    // console.log(enable_valid_and_command_button)
    dishInstance.get_dish({dispatch:dispatch})
    // setMenuToDay(dish_selector.map((dish_item:any)=> dish_item.restaurant_id==1))

    // console.log('dhjdhsajdhjas',dish_selector!=undefined?dish_selector.find((dish:any)=> dish.restaurant_id===changeRestaurant):{})
  },[])

  return (
    <NativeBaseProvider>
    <ScrollView>
    <View className=''>
      <CustomNavbar setChangeRestaurant={setChangeRestaurant} ></CustomNavbar>
      {/* <Text>Restaurant</Text>
      <Link className='mt-12 bg-red-400' href={'/Sign-in'}>ihdjdhjhsajhdjashdjash </Link>
      <TouchableOpacity
      onPress={()=> console.log(changeRestaurant)}
      >
        <Text>
          got to Order
        </Text>
      </TouchableOpacity> */}

      {
        changeRestaurant==1?<>
        <Card restaurants ={restaurants} setRestaurants={setRestaurants} plateImage={menu.plateImage}    dish_selector={dish_selector!=undefined?dish_selector.find((dish:any)=> dish.restaurant_id==changeRestaurant):{}}/>
        
        <QrCode isOpen={isOpenQrCode} setIsOpen={setIsOpenQrCode}/>

       <View className='mb-6'>
      <CustomButton
    //  disable={true}
            padding={4}
            label='Valider'
            width={'sm'}
            variant='secondary'
            onPress={() => ()=>validOrder(changeRestaurant)}
            disable ={restaurants[0].validated}
          />
      </View>
      </>
        :
        <>
        <Card restaurants ={restaurants} setRestaurants={setRestaurants} plateImage={menu.plateImage} dish_selector={dish_selector!=undefined?dish_selector.find((dish:any)=> dish.restaurant_id==changeRestaurant):{}}/>
        
        <QrCode isOpen={isOpenQrCode} setIsOpen={setIsOpenQrCode}/>

       <View className='mb-6'>
      <CustomButton
    //  disable={true}
            padding={4}
            label='Valider'
            width={'sm'}
            variant='secondary'
            onPress={() => ()=>validOrder(changeRestaurant)}
            disable ={restaurants[1].validated}
          />
      </View>
      </>
      }
                      {/* <View className='mt-8'>
                     <CustomButton padding={2} onPress={()=> setIsOpenModal(true)} variant='secondary' label='Valider votre commande'></CustomButton>
                     </View>  */}
 
    
    </View>
    </ScrollView>
    </NativeBaseProvider>
  )
}

export default Restaurant