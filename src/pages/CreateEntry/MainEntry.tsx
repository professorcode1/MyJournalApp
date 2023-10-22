import * as React from 'react'
import {
    Image,
    Text,
    View,
    TextInput,
    ScrollView,
    SafeAreaView ,
    Button,
    TouchableOpacity
  } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../redux/store';

const SelectedEntry:React.FC<{index:null|number}> = ({index}) =>{
    if(index === null){
        return null
    }
    return (
        <>
        <View>
            <Text>{index}</Text>
        </View>
        </>
    ) 
}

const EntriesList:React.FC<{}> = () => {
    return (
        <>
        <View className='flex h-24 border border-black'  >

        </View>
        </>
    )
}

const MainEntry : React.FC<{}> = () => {
    const entries = useAppSelector(s => s.currentEntry.entries)
    const [selectedEntry,setSelectedEntry] = React.useState<number|null>(null)
    return (
        <View className='border border-black m-4 bg-white' style={{
            height:700
        }}>
            <SelectedEntry index={selectedEntry} />
            <EntriesList />
        </View>
    )
}

export {MainEntry}