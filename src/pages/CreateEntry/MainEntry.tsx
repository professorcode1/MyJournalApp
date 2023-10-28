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
    Alert,
    Modal
  } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { IDiaryEntryDiscrete,EDiaryEntry, appendTextEntry, appendImageEntry} from '../../redux/current_entry';
import { Camera } from 'expo-camera';
import { delete_file } from '../../io/filesyste';
const PLUS_ICON_SIZE = 60

const EntryPictureClicked:React.FC<{setSelectedEntryToCreatedEntry:()=>void, dismountSelf:()=>void}> = ({setSelectedEntryToCreatedEntry, dismountSelf}) => {
    const [hasCameraPermission, setHasCameraPermission] = React.useState<boolean>(false)
    const CameraRef = React.useRef<Camera>(null)
    const [cameraIsReady, setCameraIsReady] = React.useState(false)
    const dispatcher = useAppDispatch()
    React.useEffect(()=>{
        (async ()=>{
            const currentCameraPermission = await Camera.getCameraPermissionsAsync(); 
            if(currentCameraPermission.status === "granted"){
                return setHasCameraPermission(true)
            }

            while((await Camera.getCameraPermissionsAsync()).status !== "granted" && (await Camera.getCameraPermissionsAsync()).canAskAgain){
                const newCameraPermission = await Camera.requestCameraPermissionsAsync();
                if(newCameraPermission.status === "granted"){
                    return setHasCameraPermission(true)
                }
            }
            Alert.alert("Camera Permission Required!", "This functionality requires that you goto settings and provide the camera permissions to this app");
            return dismountSelf();
        })()



    }, [])
    const ClickBottonPressed = async () => {
        if(CameraRef.current === null){
            return 
        }
        if(!cameraIsReady){
            return Alert.alert("Camera not ready", "The camera is not ready yet. Please try again in a few seconds.")
        }
        const photo = await CameraRef.current.takePictureAsync({base64:true})
        dispatcher(appendImageEntry(photo.base64!))
        await delete_file(photo.uri)
        setSelectedEntryToCreatedEntry()
    }
    if(!hasCameraPermission){
        return <View>
            <Text>Please wait while we work out the camera permissions...</Text>
        </View>
    }
    return (
        <Camera className='h-full flex items-center justify-end' ref={CameraRef} onCameraReady={() => {setCameraIsReady(true)}}>
            <TouchableOpacity className='h-16 w-16  rounded-full border border-white m-2 p-1' onPress={ClickBottonPressed}>
                <View className='bg-white h-full w-full rounded-full' />
            </TouchableOpacity>
        </Camera>
    )
}

const CreateEntry:React.FC<{setSelectedEntry:(n:number)=>void}> = ({setSelectedEntry}) => {
    const [entryMethod, setEntryMethod] = React.useState<EDiaryEntry|null>(null)
    const [entryText, setEntryText] = React.useState<string>("")
    const dispatcher = useAppDispatch();
    const current_number_of_entries = useAppSelector(s => s.currentEntry.entries.length)
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
    if(entryMethod === "TEXT"){
        return (
            <View className='flex h-full pt-4 items-center'>
                <TextInput className='border border-black m-4 p-4 mt-0 mb-0 rounded-md text-base h-[90%] w-[95%]' 
                    value={entryText}
                    onChangeText={setEntryText}
                    multiline={true}
                    style={{
                        textAlignVertical:'top'
                    }}
                />
                <TouchableOpacity className='border p-2 h-[8%] m-1 w-[95%] bg-theme-green ' onPress={()=>{
                    if(entryText.length === 0){
                        return Alert.alert("Empty Entry!", "Please write something in the text box before making entry.")
                    }
                    dispatcher(appendTextEntry(entryText))
                    setSelectedEntry(current_number_of_entries)
                }}>
                    <Text className='text-center text-white text-3xl'>Make entry</Text>
                </TouchableOpacity>
            </View>
        )
    }
    return <EntryPictureClicked setSelectedEntryToCreatedEntry={()=>setSelectedEntry(current_number_of_entries)} dismountSelf={()=>setEntryMethod(null)} />
}

const SelectedEntry:React.FC<{index:null|number, setSelectedEntry:(n:number)=>void}> = ({index, setSelectedEntry}) =>{
    if(index === null){
        return <CreateEntry setSelectedEntry={setSelectedEntry} />
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

const SingleEntry:React.FC<{data:IDiaryEntryDiscrete, index:number, selected:boolean}> = (props) => {
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
                className={'border m-1 relative flex items-center overflow-hidden' + (props.selected ? " border-green-500" : " border-black")} 
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

const EntriesList:React.FC<{
    setSelectedEntry:(n:number)=>void, 
    selectedEntry:number,
    viewOnly:boolean
}> = ({setSelectedEntry, selectedEntry, viewOnly}) => {
    const style = {width: PLUS_ICON_SIZE, height: PLUS_ICON_SIZE}
    const style1 = {width: PLUS_ICON_SIZE+2, height: PLUS_ICON_SIZE+2}
    const entries = useAppSelector(s => s.currentEntry.entries)
    
    return (
        <>
        <View className='flex flex-row border-t border-black  absolute bottom-0'  >
        <ScrollView horizontal>
            {entries.map((data,index)=>
                <TouchableOpacity onPress={()=>{setSelectedEntry(index)}} key={`KEY_PROP_FOR_REACT_LIST_OF_ENTRIES_IN_ENTRY_SELECTOR${index}`}>
                    <SingleEntry data={data} index={index} selected={index === selectedEntry} />
                </TouchableOpacity>
            )}
            {viewOnly || <TouchableOpacity onPress={()=>setSelectedEntry(null)}>
                <View className='rounded-full border border-black m-1' style={style1}>
                    <Image 
                        source={require("../../../assets/plus.jpg")}

                        style={style} 
                        className=' object-cover rounded-full bg-theme-green'
                        resizeMode={'cover'}
                        />
                </View>
            </TouchableOpacity>}
        </ScrollView>
        </View>
        </>
    )
}

const MainEntry : React.FC<{viewOnly?:boolean}> = ({viewOnly}) => {
    viewOnly = viewOnly === undefined ? false : viewOnly
    const [selectedEntry,setSelectedEntry] = React.useState<number|null>(viewOnly ? 0 : null)
    return (
        <View className='border border-black m-4 bg-white relative' style={{
            height:700
        }}>
            <View className='absolute top-0 ' style={{
                height:627,
                width:"100%"
            }}>
                <SelectedEntry index={selectedEntry} setSelectedEntry={setSelectedEntry} />
            </View>
            <EntriesList selectedEntry={selectedEntry} setSelectedEntry={setSelectedEntry} viewOnly={viewOnly}  />
        </View>
    )
}

export {MainEntry}