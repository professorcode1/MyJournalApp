import * as React from 'react'
import {
    View,
    ScrollView,
    SafeAreaView ,
    Text
  } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {Metadata} from "./Metadata"
import { MainEntry } from './MainEntry';







const CreateEntryScreen : React.FC<{}> = () =>{
    return (
        <KeyboardAwareScrollView>

        <View className='bg-theme-blue h-screen flex flex-col justify-center pt-8'>
            <SafeAreaView >    
                <ScrollView >
                    <MainEntry />
                    <Metadata />
                    <View className='flex flex-row justify-around m-4 pb-4 mx-0'>
                        <View className='bg-red-400 h-full w-[40%] rounded-lg p-1 m-1'>
                            <Text className='text-2xl text-white text-center w-full'>Discard</Text>
                        </View>
                        <View className='bg-green-400 h-full w-[40%] rounded-lg p-1 m-1' >
                            <Text className='text-2xl text-white text-center w-full'>Submit</Text>
                        </View>
                    </View>
                </ ScrollView >
            </SafeAreaView >
        </View>
        </KeyboardAwareScrollView>
    )
} 

export {CreateEntryScreen}