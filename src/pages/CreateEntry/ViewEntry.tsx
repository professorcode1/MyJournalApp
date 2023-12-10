import * as React from 'react'
import {
    View,
    ScrollView,
    SafeAreaView ,
    TouchableOpacity,
    Text,
    BackHandler
  } from 'react-native';
import {Metadata} from "./Metadata"
import { MainEntry } from './MainEntry';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { setScreen } from '../../redux/screen';
import { Waiting } from '../Waiting';
import { decryptCurrentEntryInplace, loadEmptyEntry } from '../../redux/current_entry';

const ViewEntryHeader:React.FC<{}> = () => {
    const {
        date,
        tldr,
        importance,
        notes} = useAppSelector(s => s.currentEntry)
    return (
    <View className='flex flex-row h-8 mt-1 px-4 justify-between w-full '>
        <TouchableOpacity>
            <Text className='text-3xl'>⬅️</Text>
        </TouchableOpacity>
        <Text className='text-white text-xl'>🗓️{date}  📈{importance}</Text>
        <TouchableOpacity>
            <Text className='text-3xl'>➡️</Text>
        </TouchableOpacity>
    </View>
)
}

const ViewEntryScreen : React.FC<{}> = () =>{
    const dispatcher = useAppDispatch()
    const [waiting,setWaiting] = React.useState(true)
    const password = useAppSelector(s => s.password)
    React.useEffect(()=>{
        (async ()=>{
            await new Promise(r => setTimeout(r, 100));
            dispatcher(decryptCurrentEntryInplace(password))
            await new Promise(r => setTimeout(r, 100));
            setWaiting(false)
        })()


        const backhandler = BackHandler.addEventListener("hardwareBackPress", ()=>{
            dispatcher(setScreen("HOME"))
            return true
        })
        return () => {
            backhandler.remove()
        }
    },[])
    if(waiting){
        return <Waiting />
    }
    return (

        <View className='bg-theme-blue h-screen flex flex-col justify-center pt-8'>
            <SafeAreaView >    
                <ScrollView >
                    <ViewEntryHeader />
                    <MainEntry viewOnly />
                    <Metadata viewOnly />
                    <TouchableOpacity className='border border-black m-4 bg-white relative bg-yellow-500' onPress={()=>{
                        dispatcher(setScreen("CREATE_ENTRY"))
                    }}>
                        <Text className='text-2xl text-white text-center w-full'>Edit Entry</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity className='bg-green-400 h-full w-full rounded-lg p-1' onPress={()=>{
                        dispatcher(setScreen("HOME"))
                    }}  >
                        <Text className='text-2xl text-white text-center w-full'>Back</Text>
                    </TouchableOpacity> */}
                </ ScrollView >
            </SafeAreaView >
        </View>
    )

} 

export {ViewEntryScreen}