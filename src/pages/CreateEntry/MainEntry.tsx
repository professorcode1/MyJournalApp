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
import { IDiaryEntryDiscrete } from '../../redux/current_entry';
const PLUS_ICON_SIZE = 60

const SelectedEntry:React.FC<{index:null|number}> = ({index}) =>{
    if(index === null){
        return null
    }
    return (
        <>
        <View className='flex'>
            <Text>{index}</Text>

        </View>
        </>
    ) 
}

const SingleEntry:React.FC<{data:IDiaryEntryDiscrete, index:number}> = (props) => {
    const style = {width: PLUS_ICON_SIZE, height: PLUS_ICON_SIZE, transform:""}
    let image;
    if(props.data.type === "TEXT"){
        image = require("../../../assets/textbox.png")
        style.transform = "scale(0.9) translateY(10px)"
    }else{
        image = require("../../../assets/camera.jpg")
        style.transform = "scale(2.25) translateY(-1.5px)"
    }
        return (
            <View 
                className='border border-black m-1 bg-theme-green relative flex items-center overflow-hidden' 
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

const EntriesList:React.FC<{}> = () => {
    const style = {width: PLUS_ICON_SIZE, height: PLUS_ICON_SIZE}
    const style1 = {width: PLUS_ICON_SIZE+2, height: PLUS_ICON_SIZE+2}
    const entries = useAppSelector(s => s.currentEntry.entries)
    
    return (
        <>
        <View className='flex flex-row border-b border-black '  >
        <ScrollView horizontal>
            {entries.map((data,index)=><SingleEntry data={data} index={index} />)}
            <View className='rounded-full border border-black m-1' style={style1}>
                <Image 
                    source={require("../../../assets/plus.jpg")}
                    style={style} 
                    className=' object-cover rounded-full '
                    resizeMode={'cover'}
                />
            </View>
        </ScrollView>
        </View>
        </>
    )
}

const MainEntry : React.FC<{}> = () => {
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