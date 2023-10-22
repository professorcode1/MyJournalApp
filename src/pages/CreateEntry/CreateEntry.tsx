import * as React from 'react'
import {
    View,
    ScrollView,
    SafeAreaView ,
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
                </ ScrollView >
            </SafeAreaView >
        </View>
        </KeyboardAwareScrollView>
    )
} 

export {CreateEntryScreen}