import * as React from 'react'
import {
    View,
    ScrollView,
    SafeAreaView ,
    TouchableOpacity,
    Text,
    BackHandler,
    Alert,
  } from 'react-native';
import {Metadata} from "./Metadata"
import { MainEntry } from './MainEntry';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { setScreen } from '../../redux/screen';
import { Waiting } from '../Waiting';
import { IDiaryEntry, decryptCurrentEntryInplace, loadEmptyEntry, loadEntry } from '../../redux/current_entry';
import { get_previous_and_next_entry } from '../../io/entries';


const ViewEntryHeader:React.FC<{
    current_entry_change:()=>void
    allEntreisViewed:()=>boolean
}> = ({current_entry_change, allEntreisViewed}) => {
    const entiresMap = useAppSelector(s => s.homepage.entriesMap)
    const currentEntry = useAppSelector(s => s.currentEntry)
    const {
        date,
        tldr,
        importance,
        notes} = currentEntry
    const [previous_entry, next_entry] = get_previous_and_next_entry(entiresMap, currentEntry)
    const dispatcher = useAppDispatch()
    const previos_entry_clicked=()=>{
        if(previous_entry === null)
            return ;
        if(allEntreisViewed()){
            dispatcher(loadEntry(previous_entry))
            current_entry_change()
            return             
        }
        Alert.alert(
            "Leave entry for sure?", 
            "You didn't view all the discrete entries corresponding to this entry. You sure you wanna view previous entry?",
            [
                {
                    text:"Yes",
                    onPress:()=>{
                        dispatcher(loadEntry(previous_entry))
                        current_entry_change()
                    },
                    style:"cancel"
                },
                {
                    text:"No",
                    onPress:()=>{}
                }
            ],
            {cancelable:true}
        )

    }
    const next_entry_clicked = () => {
        if(next_entry === null){
            return ;
        }
        if(allEntreisViewed()){
            dispatcher(loadEntry(next_entry))
            current_entry_change()
            return 
        }
        Alert.alert(
            "Leave entry for sure?", 
            "You didn't view all the discrete entries corresponding to this entry. You sure you wanna view next entry?",
            [
                {
                    text:"Yes",
                    onPress:()=>{
                        dispatcher(loadEntry(next_entry))
                        current_entry_change()
                    },
                    style:"cancel"
                },
                {
                    text:"No",
                    onPress:()=>{}
                }
            ],
            {cancelable:true}
        )
    }
    return (
    <View className='flex flex-row h-8 mt-1 px-4 justify-between w-full '>
        <TouchableOpacity 
            disabled={previous_entry===null}
            onPress={previos_entry_clicked}
        >
            {previous_entry!==null && <Text className='text-3xl'>⬅️</Text>}
            {previous_entry===null && <Text className='text-3xl'> </Text>}
        </TouchableOpacity>
        <Text className='text-white text-xl'>🗓️{date}  📈{importance}</Text>
        <TouchableOpacity 
            disabled={next_entry===null}
            onPress={next_entry_clicked}
        >
            {next_entry!==null && <Text className='text-3xl'>➡️</Text>}
            {next_entry===null && <Text className='text-3xl'> </Text>}
        </TouchableOpacity>
    </View>
)
}

const ViewEntryScreen : React.FC<{}> = () =>{
    const dispatcher = useAppDispatch()
    const [waiting,setWaiting] = React.useState(true)
    const password = useAppSelector(s => s.password)
    const current_entry = useAppSelector(s => s.currentEntry)

    const backPressed = ()=>{
        if(allEntreisViewed()){
            return dispatcher(setScreen("HOME"))
        }   
        Alert.alert(
            "Leave entry for sure?", 
            "You didn't view all the discrete entries corresponding to this entry. You sure you wanna go back?",
            [
                {
                    text:"Yes",
                    onPress:()=>{dispatcher(setScreen("HOME"))},
                    style:"cancel"
                },
                {
                    text:"No",
                    onPress:()=>{}
                }
            ],
            {cancelable:true}
        )
    }
    const decrypt_current_entry_inplace = async () => {
        setWaiting(true)
        await new Promise(r => setTimeout(r, 100));
        dispatcher(decryptCurrentEntryInplace(password))
        await new Promise(r => setTimeout(r, 100));
        setWaiting(false)
    }
    React.useEffect(()=>{
        decrypt_current_entry_inplace()

        const backhandler = BackHandler.addEventListener("hardwareBackPress", ()=>{
            backPressed()
            return true
        })
        return () => {
            backhandler.remove()
        }
    },[])
    if(waiting){
        return <Waiting />
    }
    const EntryIndexesViewed = Array(current_entry.entries.length).fill(undefined).map((_,index)=>index === 0)
    const allEntreisViewed = ()=>EntryIndexesViewed.every(_=>_)
    return (

        <View className='bg-theme-blue h-screen flex flex-col justify-center pt-8'>
            <SafeAreaView >    
                <ScrollView >
                    <ViewEntryHeader allEntreisViewed={allEntreisViewed} current_entry_change={decrypt_current_entry_inplace} />
                    <MainEntry viewOnly currentEntry={current_entry} selectedEntryCB={(i) => EntryIndexesViewed[i] = true}  />
                    <Metadata viewOnly />
                    <TouchableOpacity className='border border-black m-4 bg-white relative bg-yellow-500' onPress={()=>{
                        dispatcher(setScreen("CREATE_ENTRY"))
                    }}>
                        <Text className='text-2xl text-white text-center w-full'>Edit Entry</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='bg-green-400 h-full w-full rounded-lg p-1' onPress={backPressed}  >
                        <Text className='text-2xl text-white text-center w-full'>Back</Text>
                    </TouchableOpacity>
                </ ScrollView >
            </SafeAreaView >
        </View>
    )

} 

export {ViewEntryScreen}