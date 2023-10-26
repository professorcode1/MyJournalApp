import * as React from 'react'
import {
    Image,
    Text,
    View,
    TextInput,
    ScrollView,
    SafeAreaView ,
    Button,
    TouchableOpacity,
  } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { IDiaryEntryDiscrete,EDiaryEntry } from '../../redux/current_entry';
import { StyledProps } from 'nativewind';
import { useSelector } from 'react-redux';
const PLUS_ICON_SIZE = 60

const CreateEntry:React.FC<{}> = () => {
    const [entryMethod, setEntryMethod] = React.useState<EDiaryEntry|null>(null)
    if(entryMethod === null){

        return (
            <View className='flex flex-col items-center justify-center h-full'>
                <TouchableOpacity onPress={()=>{setEntryMethod("IMAGE")}} className='h-1/2 w-full'>
                    <View className='p-1 h-full border-b border-slate-600  w-full flex items-center justify-center'>
                        <Text className='text-4xl '>
                            Photo
                        </Text>
                    </View>
                </TouchableOpacity>
            
                <TouchableOpacity onPress={()=>{setEntryMethod("TEXT")}} className='h-1/2 w-full'>
                    <View className='p-1 h-full  w-full flex items-center justify-center'>
                        <Text className='text-4xl'>
                            Text
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const SelectedEntry:React.FC<{index:null|number}> = ({index}) =>{
    if(index === null){
        return <CreateEntry />
    }
    const entry = useAppSelector(s => s.currentEntry.entries[index])
    if(entry.type === "IMAGE"){
        return (
            <View className='border relative '>
                <ScrollView horizontal>
                    <Image 
                        source={{uri:`data:image/png;base64,${entry.content}`}}
                        style={{
                            height:"100%",
                            width:undefined,
                            aspectRatio:1.0
                        }}
                    />
                </ScrollView>
            </View>
        )
    }
    return (
        <View className='px-2'>
            <ScrollView  nestedScrollEnabled={true}>
                <Text className='text-xl'>
                    {entry.content}
                </Text>
            </ScrollView>
        </View>
    ) 
}

const SingleEntry:React.FC<{data:IDiaryEntryDiscrete, index:number}> = (props) => {
    const style= {width: PLUS_ICON_SIZE, height: PLUS_ICON_SIZE, transform:[]}
    let image;
    if(props.data.type === "TEXT"){
        image = require("../../../assets/textbox.png")
        style.transform.push({scale:0.9});
        style.transform.push({translateY:10});
    }else{
        image = require("../../../assets/camera.jpg")
        style.transform.push({scale:2.25});
        style.transform.push({translateY:-1.5});
    }
        return (
            <View 
                className='border border-black m-1  relative flex items-center overflow-hidden' 
            >
                <Image
                    source={image} 
                    style={style} 
                    className=' object-cover '
                    resizeMode={'cover'}  
                />
                <Text className='absolute text-2xl pt-5'>{props.index+1}</Text>
            </View>
        )
    return null
}

const EntriesList:React.FC<{setSelectedEntry:(n:number)=>void}> = ({setSelectedEntry}) => {
    const style = {width: PLUS_ICON_SIZE, height: PLUS_ICON_SIZE}
    const style1 = {width: PLUS_ICON_SIZE+2, height: PLUS_ICON_SIZE+2}
    const entries = useAppSelector(s => s.currentEntry.entries)
    
    return (
        <>
        <View className='flex flex-row border-t border-black  absolute bottom-0'  >
        <ScrollView horizontal>
            {entries.map((data,index)=>
                <TouchableOpacity onPress={()=>{setSelectedEntry(index)}} key={`KEY_PROP_FOR_REACT_LIST_OF_ENTRIES_IN_ENTRY_SELECTOR${index}`}>
                    <SingleEntry data={data} index={index}  />
                </TouchableOpacity>
            )}
            <TouchableOpacity onPress={()=>setSelectedEntry(null)}>
                <View className='rounded-full border border-black m-1' style={style1}>
                    <Image 
                        source={require("../../../assets/plus.jpg")}

                        style={style} 
                        className=' object-cover rounded-full bg-theme-green'
                        resizeMode={'cover'}
                        />
                </View>
            </TouchableOpacity>
        </ScrollView>
        </View>
        </>
    )
}

const MainEntry : React.FC<{}> = () => {
    const [selectedEntry,setSelectedEntry] = React.useState<number|null>(null)
    return (
        <View className='border border-black m-4 bg-white relative' style={{
            height:700
        }}>
            <View className='absolute top-0 ' style={{
                height:627,
                width:"100%"
            }}>
                <SelectedEntry index={selectedEntry} />
            </View>
            <EntriesList setSelectedEntry={setSelectedEntry}  />
        </View>
    )
}

export {MainEntry}