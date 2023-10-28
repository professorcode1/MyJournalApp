import * as React from 'react'
import {
    View,
    ScrollView,
    SafeAreaView ,
    TouchableOpacity,
    Text
  } from 'react-native';
import {Metadata} from "./Metadata"
import { MainEntry } from './MainEntry';
import { useAppDispatch } from '../../redux/store';
import { setScreen } from '../../redux/screen';

const ViewEntryScreen : React.FC<{}> = () =>{
    const dispatcher = useAppDispatch()
    return (

        <View className='bg-theme-blue h-screen flex flex-col justify-center pt-8'>
            <SafeAreaView >    
                <ScrollView >
                    <MainEntry viewOnly />
                    <Metadata viewOnly />
                    <TouchableOpacity className='bg-green-400 h-full w-full rounded-lg p-1' onPress={()=>{
                        dispatcher(setScreen("HOME"))
                    }}  >
                        <Text className='text-2xl text-white text-center w-full'>Back</Text>
                    </TouchableOpacity>
                </ ScrollView >
            </SafeAreaView >
        </View>
    )
} 

export {ViewEntryScreen}