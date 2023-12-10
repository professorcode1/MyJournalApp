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
import { write_entry_to_disk } from '../../io/entries';
import { Waiting } from '../Waiting';

const SubmitAndDiscardButtons:React.FC<{setWaiting:(i:boolean)=>void}> = ({setWaiting}) => {
    const dispatcher = useAppDispatch()
    const entry = useAppSelector(s => s.currentEntry)
    const password = useAppSelector(s => s.password)
    const submit = async () => {
        if(entry.entries.length === 0){
            return Alert.alert("No entries made!", "Plase make some entries before hitting submit")
        }
        console.log(entry.tldr, typeof entry.tldr)
        if(typeof entry.tldr !== "string" || entry.tldr.length === 0 ){
            return Alert.alert("Invalid TLDR", `Please write a summary. Summary is an important part of journaling`)
        }
        setWaiting(true)
        await new Promise(r => setTimeout(r, 100));
        await write_entry_to_disk(entry, password)
        setWaiting(false)
        dispatcher(setScreen("HOME"))

    }
    return (
        <View className='flex flex-row justify-around m-4 pb-4 mx-0'>
        <TouchableOpacity className='bg-red-400 h-full w-[40%] rounded-lg p-1 m-1' onPress={()=>{
            dispatcher(setScreen("HOME"))
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
    const dispatcher = useAppDispatch()
    const [waiting, setWaiting] = React.useState(false)
    const current_entry = useAppSelector(s => s.currentEntry)
    if(!waiting){

        return (
            <KeyboardAwareScrollView>

                <View className='bg-theme-blue h-screen flex flex-col justify-center pt-8'>
                    <SafeAreaView >    
                        <ScrollView >
                            <MainEntry currentEntry={current_entry} />
                            <Metadata />
                            <SubmitAndDiscardButtons setWaiting={setWaiting} />
                        </ ScrollView >
                    </SafeAreaView >
                </View>
            </KeyboardAwareScrollView>
        )
    }
    return (
        <Waiting />
    )
} 

export {CreateEntryScreen}