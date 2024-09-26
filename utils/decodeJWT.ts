import { View, Text } from 'react-native'
import React from 'react'
import { useSelector, UseSelector } from 'react-redux'
import { jwtDecode } from 'jwt-decode'


export const decodeJWT = (access_token:string) =>{
    // const selector = useSelector(state => state.auth.user)

    const dataOfUser = jwtDecode(access_token)

    // console.log(dataOfUser)

    return dataOfUser

}
