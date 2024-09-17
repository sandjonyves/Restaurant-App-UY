import { View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated'
import React from 'react'
import { Button, IconButton, Stack } from 'native-base'
import { Icon } from 'react-native-paper'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'

type CustomButtonPropsType ={
    label: string;
    variant?: 'primary' | 'secondary' | 'danger';
    isLoading?: boolean;
    width ?:String;
    padding:number;
    width_label?:String,
    disable?:boolean;
    rounded?:string;
    icon?:boolean;
    iconName?: string;
    iconSize?:string;
    iconStyle?:string;
    onPress?: () => void;

}

const CustomButton = ({
    label,
    variant = 'primary',
    isLoading = false,
    disable=false,
    width,
    padding,
    rounded='full',
    width_label='xl',
    icon,
    iconName,
    iconSize,
    iconStyle,
    onPress,
    ...props
}:CustomButtonPropsType) => {

    const getVariantStyles = () => {
        switch (variant) {
            case 'primary':
                return 'bg-light-tabBarActiveTintColor text-white dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800';
            case 'secondary':
                return 'bg-sky-500 hover:bg-sky-600 text-white dark:bg-sky-600 dark:hover:bg-blue-700 dark:focus:ring-sky-800';
            case 'danger':
                return 'bg-red-500 hover:bg-red-600 text-white dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800';
            default:
                return 'bg-sky-500 hover:bg-sky-600 text-white dark:bg-sky-600 dark:hover:bg-blue-700 dark:focus:ring-sky-800';
        }
    };

  return (
        <View>
            {isLoading ?
                <TouchableOpacity disabled  className={`text-white ${getVariantStyles()} dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center`}>
                    {/* <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                    </svg> */}
                    <Text className='text-white text-center'>{label}</Text>

                </TouchableOpacity>:

                disable?
                    
                <View
                
                    className={`
                       text-white bg-blue-100 dark:bg-blue-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center}`}
                    {...props}
                >
                    <Text className='text-white text-center'>{label}</Text>
                </View>
                :
                
                <TouchableOpacity
                    onPress={onPress}
                    className={`
                        ${
                            icon?'flex flex-row justify-center':'flex'
                          }   
                        marker:text-white  ${getVariantStyles()} flex items-center p-${padding} rounded-full rounded-${rounded}  w-${width?width:'full'} `}
                    {...props}
                >
                    {
                        icon ? <MaterialCommunityIcons name='qrcode-scan' color={'red'} size={30}/> :null
                    }
                    <Text className={`text-white text-bold  text-${width_label} font-bold`}>{label}</Text>
                </TouchableOpacity>}
        </View>
  )
}

export default CustomButton