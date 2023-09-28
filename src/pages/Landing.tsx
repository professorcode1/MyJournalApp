import * as React from 'react'
import {
    Image,
    Text,
    View,
    TextInput
  } from 'react-native';

const InputPassword:React.FC<{}> = () => {
    const [password, setPassword] = React.useState("")
    console.log("mounted")
    return (
        <View className='  border-4 rounded-lg bg-white border-green-400 mt-10 flex flex-col p-10' onTouchStart={()=>{
            console.log("touched")
        }}>
            <Text className='text-xl font-extrabold'>Log In</Text>
            <TextInput className='border border-black mt-4 rounded-md' 
                secureTextEntry={true}
                value={password}
                onChangeText={text=>setPassword(text)}
            />
            <Text className='text-xl mt-4 font-bold border rounded-lg p-2 w-[84px]  bg-theme-green'>Submit</Text>	
        </View>
    )
}

const Landing : React.FC<{}> = () =>{
    const journalingVideo = require("../../assets/journaling.gif")
    return (
        <View className='bg-theme-blue h-screen flex flex-col p-2 justify-center'>
            <View className='h-1/3 flex items-center'>
                <Image source={journalingVideo}  className='h-full object-contain 'style={{
                    objectFit:"contain"
                }} />
            </View>
            <InputPassword />
        </View>
    )
} 

export {Landing}