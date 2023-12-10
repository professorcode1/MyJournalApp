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
import { IDiaryEntry, decryptCurrentEntryInplace, loadEmptyEntry, loadEntry } from '../../redux/current_entry';

function get_previous_and_next_entry(
    entiresMap:{[key:string]:IDiaryEntry[]}, current_entry:IDiaryEntry
):[IDiaryEntry|null, IDiaryEntry|null]{
    const date_string_to_date:(date_string:string)=>Date = (date_string) => new Date(date_string.split('/').reverse().join('-'))
    const current_entry_index_in_its_parent_day_array = entiresMap[current_entry.date].findIndex((e) => e.filename === current_entry.filename)
    const this_entires_date_object = date_string_to_date(current_entry.date)
    let previous_entry:IDiaryEntry|null = null, 
        next_entry:IDiaryEntry|null = null;
    if(current_entry_index_in_its_parent_day_array > 0){
        previous_entry = entiresMap[current_entry.date][current_entry_index_in_its_parent_day_array -1];
    }else{

        const potential_previous_entires = Object.keys(entiresMap).map(date_string_to_date).filter(
            date_ => date_ < this_entires_date_object
        ).sort()
        if(potential_previous_entires.length > 0){
            const previous_entry_date = potential_previous_entires[potential_previous_entires.length-1]
            const previous_entires_ = entiresMap[previous_entry_date.toLocaleDateString('en-GB')]
            previous_entry = previous_entires_[previous_entires_.length -1]
        }
    }

    if(current_entry_index_in_its_parent_day_array < (entiresMap[current_entry.date].length - 1)){
        next_entry = entiresMap[current_entry.date][current_entry_index_in_its_parent_day_array+1]
    }else{
        const potential_next_entires = Object.keys(entiresMap).map(
            date_string_to_date
        ).filter(
            date_ => date_ > this_entires_date_object
        ).sort()
        if(potential_next_entires.length > 0){
            const next_entry_date = potential_next_entires[0]
            const next_entries = entiresMap[next_entry_date.toLocaleDateString('en-GB')]
            next_entry = next_entries[0]
        }
    }

    return [previous_entry, next_entry]
}

const ViewEntryHeader:React.FC<{current_entry_change:()=>void}> = ({current_entry_change}) => {
    const entiresMap = useAppSelector(s => s.homepage.entriesMap)
    const currentEntry = useAppSelector(s => s.currentEntry)
    const {
        date,
        tldr,
        importance,
        notes} = currentEntry
    const [previous_entry, next_entry] = get_previous_and_next_entry(entiresMap, currentEntry)
    const dispatcher = useAppDispatch()
    return (
    <View className='flex flex-row h-8 mt-1 px-4 justify-between w-full '>
        <TouchableOpacity 
            disabled={previous_entry===null}
            onPress={()=>{
                if(previous_entry !== null){
                    dispatcher(loadEntry(previous_entry))
                    current_entry_change()
                }
            }}
        >
            {previous_entry!==null && <Text className='text-3xl'>⬅️</Text>}
            {previous_entry===null && <Text className='text-3xl'> </Text>}
        </TouchableOpacity>
        <Text className='text-white text-xl'>🗓️{date}  📈{importance}</Text>
        <TouchableOpacity 
            disabled={next_entry===null}
            onPress={()=>{
                if(next_entry!==null){
                    dispatcher(loadEntry(next_entry))
                    current_entry_change()
                }
            }}
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
                    <ViewEntryHeader current_entry_change={decrypt_current_entry_inplace} />
                    <MainEntry viewOnly />
                    <Metadata viewOnly />
                    <TouchableOpacity className='border border-black m-4 bg-white relative bg-yellow-500' onPress={()=>{
                        dispatcher(setScreen("CREATE_ENTRY"))
                    }}>
                        <Text className='text-2xl text-white text-center w-full'>Edit Entry</Text>
                    </TouchableOpacity>
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