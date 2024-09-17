import { View, Text, TextInput } from 'react-native'
import React from 'react'

type propsFormField={
    title:string,
    value:string,
    placeholder?:string,
    handleChangeText : (value:string)=> void,
    otherStyles  : object,
    keyboardType:string
}

const FormField = ({title,value,placeholder,handleChangeText,otherStyles ,keyboardType,...props}:propsFormField) => {
  return (
    <View  style={{}}>
      <TextInput className='bg-red-500 rounded-lg m-5 ' placeholder={placeholder} value={value} />
    </View>
  )
}

export default FormField