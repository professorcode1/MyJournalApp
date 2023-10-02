import * as React from 'react'
import {
    Image,
    Text,
    View,
    TextInput
  } from 'react-native';

const Homepage : React.FC<{}> = () =>{
    return (
        <View className='bg-theme-blue h-screen flex flex-col p-2 justify-center'>
            <Text>Hello world I am homepage</Text>
        </View>
    )
} 

export {Homepage}