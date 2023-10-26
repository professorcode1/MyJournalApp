import * as React from 'react'
import {
    View,
    ScrollView,
    SafeAreaView ,
    Text,
    Alert,
    TouchableOpacity
  } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {Metadata} from "./Metadata"
import { MainEntry } from './MainEntry';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { setScreen } from '../../redux/screen';
import { loadEmptyEntry } from '../../redux/current_entry';
import { write_entry_to_disk } from '../../io/create_entry';

const SubmitAndDiscardButtons:React.FC<{}> = () => {
    const dispatcher = useAppDispatch()
    const entry = useAppSelector(s => s.currentEntry)
    const password = useAppSelector(s => s.password)
    const submit = async () => {
        if(entry.entries.length === 0){
            return Alert.alert("No entries made!", "Plase make some entries before hitting submit")
        }
        if(entry.importance > 100 || entry.importance<0){
            return Alert.alert("Invalid Importance", `Importance should be b/w 0 and 100 included, right now its ${entry.importance}`)
        }
        await write_entry_to_disk(entry, password)
        dispatcher(setScreen("HOME"))
        dispatcher(loadEmptyEntry())

    }
    return (
        <View className='flex flex-row justify-around m-4 pb-4 mx-0'>
        <TouchableOpacity className='bg-red-400 h-full w-[40%] rounded-lg p-1 m-1' onPress={()=>{
            dispatcher(setScreen("HOME"))
            dispatcher(loadEmptyEntry())
        }}>
            <Text className='text-2xl text-white text-center w-full'>Discard</Text>
        </TouchableOpacity>
        <TouchableOpacity className='bg-green-400 h-full w-[40%] rounded-lg p-1 m-1' onPress={submit} >
            <Text className='text-2xl text-white text-center w-full'>Submit</Text>
        </TouchableOpacity>
    </View>
    )
}

const CreateEntryScreen : React.FC<{}> = () =>{

    return (
        <KeyboardAwareScrollView>

        <View className='bg-theme-blue h-screen flex flex-col justify-center pt-8'>
            <SafeAreaView >    
                <ScrollView >
                    <MainEntry />
                    <Metadata />
                    <SubmitAndDiscardButtons />
                </ ScrollView >
            </SafeAreaView >
        </View>
        </KeyboardAwareScrollView>
    )
} 

export {CreateEntryScreen}