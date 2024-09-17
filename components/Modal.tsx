import { View, Text, Modal as NModal,ModalProps, KeyboardAvoidingView, Platform, TouchableOpacity,Image } from 'react-native'
import React from 'react'
import { icons } from '@/constants'
type PROPS_MODAL = ModalProps &{
    isOpen : boolean,
    withInput?: boolean
}

const Modal = ({isOpen,withInput,children,...rest}:PROPS_MODAL) => {
  
    const content = withInput ? 
        <KeyboardAvoidingView
        className='flex-1 px-3 bg-zinc-900/40'
        behavior={Platform.OS === "ios" ? 'padding' : 'height'}
        >
        <View className='flex-1 items-end m-3'>
            <TouchableOpacity>
                    <Image 
                    className='w-4 h-4'
                    tintColor={'red'}
                    source={icons.close}></Image>
            </TouchableOpacity>
        </View>
            {children}
        </KeyboardAvoidingView>
      :
      <View
        className='flex-1 bg-zinc-900/40'
      >

    <View className='items-center justify-center flex-1'>
      {children}
    </View>
      </View>
   
  
    return (
   <NModal
   visible={isOpen}
   transparent
   animationType='fade'
   statusBarTranslucent
   {...rest}

   >
   
  
        {content}
   </NModal>
  )
}

export default Modal