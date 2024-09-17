import { View, Text } from 'react-native'
import React from 'react'
import { Controller,useForm } from 'react-hook-form'
import Animated from 'react-native-reanimated'
import { Button } from "native-base";
// import { Picker } from '@react-native-picker/picker';
const R1Form = () => {

    const {control,handleSubmit} = useForm()
  return (
    <View>
      <View>
     
      {/* <Button onPress={() => console.log("hello world")}>Click Me</Button> */}
        <Controller
        control={control}
        name = 'Quantiter'
        render={({field :{onBlur,value}})=>(
                <Animated.View>
           
                </Animated.View>
        )}
        />
        
        
      </View>
    </View>
  )
}

export default R1Form