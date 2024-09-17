import { View, Text, TouchableOpacity } from 'react-native'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { Link ,router} from 'expo-router'
import { menu } from '@/db/menu'

import CustomNavbar from '@/components/NavBar'
import Restaurant1 from '@/components/restaurant/Restaurant1'
import CustomButton from '@/components/CustomButton'
import Card from '@/components/restaurant/Card'
import QrCode from '@/components/QrCode'

type Props_Restaurant={
  changePage?:boolean,
  setChangePage? : Dispatch<SetStateAction<Boolean>>
}
const Restaurant = () => {
  const [changePage,setChangePage] = useState<boolean>(true)

  const [IsOpenModal,setIsOpenModal] = useState<boolean>(false)
  const handleShow = () => {setIsOpenModal(false)}

  return (

    
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
                     {/* <View className='mt-2'>
                     <CustomButton padding={2} onPress={()=> setIsOpenModal(true)} variant='secondary' label='Valider votre commande'></CustomButton>
                     </View> */}
      
    
       <QrCode isOpen={IsOpenModal} handleShow={handleShow}></QrCode>
    
    </View>
  )
}

export default Restaurant