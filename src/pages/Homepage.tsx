import * as React from 'react'
import {
    TouchableOpacity,
    View,
    Text
  } from 'react-native';
import { useAppDispatch } from '../redux/store';
import { setScreen } from '../redux/screen';

const Homepage : React.FC<{}> = () =>{
    const dispatcher = useAppDispatch()
    return (
        <View className='bg-theme-blue h-screen flex flex-col p-2 justify-center items-center'>
            <TouchableOpacity 
                className='bg-white rounded-lg p-2 border-blue-400 border-2'
                onPress={()=>{dispatcher(setScreen("CREATE_ENTRY"))}}
            >
                <Text className='text-xl'>
                    Create Entry  
                </Text>
            </TouchableOpacity>
        </View>
    )
} 

export {Homepage}