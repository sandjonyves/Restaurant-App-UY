import { View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import { router } from 'expo-router';
import { useForm, Controller } from 'react-hook-form'
import CustomButton from '@/components/CustomButton';


type FormData = {
    username: string,
    matricule: string,
    password: string,
    confirmPassword: string

}

const Signin = () => {
    const { handleSubmit, control } = useForm<FormData>()

    const verifPassword = (data:FormData)=>{
        return data.password ===data.confirmPassword
    }
    const onSubmit = (data: FormData) => {
        if (verifPassword){
            Alert.alert('ok')
        }else{
            Alert.alert('bard')
        }
       
        console.log(data)
    }
    return (
        // <KeyboardAvoidingView
        // style={{ flex: 1 }}
        // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        // >
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0} // ajuste la valeur selon tes besoins
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <StatusBar style='light' />
                <Animated.Image  className="mt-4 h-[50%] w-full absolute" source={require('@/assets/images/login.png')} />


                <View className=' flex-row justify-around w-full absolute'>
                    <Animated.Image entering={FadeInUp.delay(200).duration(1000).springify().damping(3)} tintColor={'#FFA001'} className='h-[100] w-[43]' source={require('@/assets/images/light.png')} />
                    {/* <Animated.Image entering={FadeInUp.delay(200).duration(1000).springify().damping(3)} className='h-40 w-40 ' source={require('@/assets/images/logo.png')} /> */}
                    <Animated.Image entering={FadeInUp.delay(200).duration(1000).springify().damping(3)} tintColor={'#FFA001'} className='h-[130] w-[60]' source={require('@/assets/images/light.png')} />

                </View>

                <View className='h-full w-full flex flex-col gap-y-20 mt-44'>
                    <View className='flex items-center'>
                        {/* <Animated.Text entering={FadeInUp.delay(1000).springify()} className='text-white font-bold tracking-wider text-2xl'>
                            Signin
                        </Animated.Text> */}
                    </View>

                    <View className='flex items-center mx-4 space-y-2'>

                        

                        <Controller
                            control={control}
                            name="matricule"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Animated.View
                                    entering={FadeInDown.duration(1000).springify()}
                                    className='bg-black/5 p-3 rounded-2xl w-full'
                                >
                                    <TextInput
                                        placeholder='Matricule'
                                        placeholderTextColor={'gray'}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        value={value}
                                    />
                                </Animated.View>
                            )}
                        />

                        <Controller
                            control={control}
                            name="password"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} className='bg-black/5 mt-2  p-2 rounded-2xl w-full'>
                                    <TextInput
                                        placeholder='Password'
                                        placeholderTextColor={'gray'}
                                        secureTextEntry={true}
                                    />
                                </Animated.View>
                            )}
                        />
                       

                        <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()} className='w-full'>
                            {/* <TouchableOpacity className='flex items-center p-4 rounded-full bg-sky-500 w-full'>
                                <Text className='text-white text-bold text-xl'
                                    onPress={handleSubmit(onSubmit)}
                                >
                                    Signin
                                </Text>
                            </TouchableOpacity> */}

                            <CustomButton  padding={4} label={'Singin'}/>
                        </Animated.View>

                        <View className='flex-row gap-x-3 justify-center'>
                            <Text>
                                Don't have an account?
                            </Text>
                            <TouchableOpacity onPress={() => router.push('/Sign-up')}>
                                <Text className='text-light-tabBarActiveTintColor'>
                                    Signup
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );

}

export default Signin;