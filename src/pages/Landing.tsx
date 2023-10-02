import * as React from 'react'
import {
    Image,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert
  } from 'react-native';
import { setPassword } from '../redux/password';
import { setScreen } from '../redux/screen';
import { useAppDispatch } from '../redux/store';
const InputPassword:React.FC<{}> = () => {
    const [passwordInput, setPasswordInput] = React.useState("")
    const dispatcher = useAppDispatch()
    const submit_click = () => {
        if(passwordInput.length === 0 ){
            Alert.alert("Password cannot be empty")
        }else{
            dispatcher(setPassword(passwordInput))
            dispatcher(setScreen("HOME"))
        }
    }
    return (
        <View className='  border-4 rounded-lg bg-white border-green-400 mt-10 flex flex-col p-10' >
            <Text className='text-xl font-extrabold'>Log In</Text>
            <TextInput className='border border-black mt-4 rounded-md' 
                secureTextEntry={true}
                value={passwordInput}
                onChangeText={setPasswordInput}
                placeholder='Password'
            />
            <TouchableOpacity  onPress={submit_click} >
                <Text className='text-xl mt-4 font-bold border rounded-lg p-2 w-[84px]  bg-theme-green'>Submit</Text>	
            </TouchableOpacity>
        </View>
    )
}

const Landing : React.FC<{}> = () =>{
    const journalingVideo = require("../../assets/journaling.gif")
    return (
        <View className='bg-theme-blue h-screen flex flex-col p-2 justify-center'>
            <View className='h-1/3 flex items-center' >
            <TouchableOpacity >
                <Image source={journalingVideo}  className='h-full object-contain 'style={{
                    objectFit:"contain"
                }}  />
            </ TouchableOpacity>
            </View>
            <InputPassword />
        </View>
    )
} 

export {Landing}