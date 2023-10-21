import * as React from 'react'
import {
    Image,
    Text,
    View,
    TextInput,
    ScrollView,
    SafeAreaView ,
  } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { useAppDispatch, useAppSelector } from '../redux/store';
import { updateDate, updateName, updateNotes, updateTLDR } from '../redux/current_entry';

const MainEntry : React.FC<{}> = () => {
    const entries = useAppSelector(s => s.currentEntry.entries)
    return (
        <View className='border border-black h-[32rem] m-4 bg-white' style={{
            height:512
        }}>
            <Text>Hello I am Main Entry Component</Text>
        </View>
    )
}

const MetaDataSingleInput: React.FC<{
    name:string, 
    value:string, 
    onChange:(text:string)=>void
}> = (props) => {
    return (
    <>
            <Text className='m-4 text-xl mb-1'> {props.name}</Text>
            <TextInput className='border border-black m-4 p-4 mt-0 mb-0 rounded-md text-base ' 
                    value={props.value}
                    onChangeText={props.onChange}
                    placeholder='Name'
                />
    </>
)}

const Metadata : React.FC<{}> = () => {
    const {name,
        date,
        tldr,
        notes} = useAppSelector(s => s.currentEntry)
    const dispatcher = useAppDispatch()
    return (
        <View className='border border-black bg-white m-4 pb-4'>

            <MetaDataSingleInput name='Name' value={name} onChange={newName => dispatcher(updateName(newName))} />
            <MetaDataSingleInput name='Date' value={date} onChange={newDate => dispatcher(updateDate(newDate))} />
            <MetaDataSingleInput name='TLDR' value={tldr} onChange={newTLDR => dispatcher(updateTLDR(newTLDR))} />
            <MetaDataSingleInput name='Notes' value={notes} onChange={newNotes => dispatcher(updateNotes(newNotes))} />
            
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
                </ ScrollView >
            </SafeAreaView >
        </View>
        </KeyboardAwareScrollView>
    )
} 

export {CreateEntryScreen}